
const ObjectId = require('mongoose').Types.ObjectId


// Require Post Schema from Model..

const Book = require('../models/book');
const Order = require('../models/order');
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const enumObj = require('../helpers/enum-obj');
const Coupon = require('../models/coupon');
const UniqueId = require('../models/unique-id');
const Reward = require('../models/reward');


/**
 * Add To ORDER
 * GET ORDER LIST
 */

exports.placeOrder = async (req, res, next) => {

    try {

        const userId = req.userData.userId;

        // Increment Order Id Unique
        const incOrder = await UniqueId.findOneAndUpdate(
            {},
            { $inc: { orderId: 1 } },
            {new: true, upsert: true}
        )

        const orderIdUnique = padLeadingZeros(incOrder.orderId);

        const finalData = {...req.body, ...{user: userId, orderId: orderIdUnique}}
        const order = new Order(finalData);
        const orderSave = await order.save();

        // let userRewardPoints = User.find({_id: userId}).rewardPoints;
        let user = await User.findOne({_id: userId});
        let userRewardPoints = user.rewardPoints ? user.rewardPoints : 0;

        if (req.body.couponId) {
            await Coupon.findByIdAndUpdate({_id: req.body.couponId}, {$push: {couponUsedByUser: userId}});
        }

        let userQuery;

        if (order.isRewardPoint) {
            if (req.body.couponId) {
                userQuery = {$set: {carts: [], rewardPoints: userRewardPoints - req.body.useReward}, $push: {checkouts: orderSave._id, usedCoupons: req.body.couponId}}
            } else {
                userQuery = {$set: {carts: [], rewardPoints: userRewardPoints - req.body.useReward}, $push: {checkouts: orderSave._id}}
            }
        } else {
            if (req.body.couponId) {
                userQuery = {$set: {carts: []}, $push: {checkouts: orderSave._id, usedCoupons: req.body.couponId}}
            } else {
                userQuery = {$set: {carts: []}, $push: {checkouts: orderSave._id}}
            }
        }

        // UPDATE USER CARTS & CHECKOUT
        await User.findOneAndUpdate(
            {_id: userId},
            userQuery
        )

        await Cart.deleteMany({user: new ObjectId(userId)});

        res.json({
            orderId: orderSave._id,
            message: 'Order Placed successfully',
        })

    } catch (err) {
        console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

// exports.getAllOrdersByUser = async (req, res, next) => {
//     try {
//         const orders = await User.findById(req.userData.userId)
//             .populate('checkouts')
//             .select('checkouts -_id');
//
//         res.json({
//             data: orders ? orders.orders : orders
//         })
//
//     } catch (error) {
//         res.json({
//             success: false,
//             errorMsg: error.message,
//             message: "Something went Wrong"
//         })
//         next(error);
//     }
// }

exports.getAllOrdersByUser = async (req, res, next) => {
    try {

        const userId = req.userData.userId;

        let pageSize = req.query.pageSize;
        let currentPage = req.query.page;
        let select = req.query.select;

        let queryData;
        queryData = Order.find({user: userId});
        let data;

        if (pageSize && currentPage) {
            queryData.skip(Number(pageSize) * (Number(currentPage) - 1)).limit(Number(pageSize))
        }

        data = await queryData.select(select ? select : '').sort({createdAt: -1});

        const dataCount = await Order.countDocuments();

        res.status(200).json({
            data: data,
            count: dataCount,
            message: 'Order get Successfully!'
        });
    } catch (err) {
        console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getOrderDetailsById = async (req, res, next) => {

    const orderId = req.params.id;

    try {
        const query = {_id: orderId}
        const data = await Order.findOne(query)
            .select('-updatedAt -sessionkey -orderPaymentInfo')
            .populate(
                {
                    path: 'orderedItems.product',
                    model: 'Book'
                }
            )

        res.status(200).json({
            data: data,
            message: 'Cart removed Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }

}

exports.cancelOrderByUser = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        let order = await Order.findById(orderId);

        if (order.deliveryStatus === enumObj.Order.PENDING && order.paymentStatus === 'unpaid') {
            order.deliveryStatus = enumObj.Order.CANCEL;
            await order.save();

            res.status(200).json({
                message: 'Order has been canceled',
                status: 1
            });
        } else {
            res.status(200).json({
                message: 'You can\'t cancel this order. Please contact with seller',
                status: 0
            });
        }

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllTransactionByUser = async (req, res, next) => {
    try {

        const userId = req.userData.userId;

        let pageSize = req.query.pageSize;
        let currentPage = req.query.page;
        let select = req.query.select;

        let data;
        let queryData;
        queryData = Order.find({
            $and: [
                { user: userId },
                {
                    $or: [
                        {deliveryStatus: enumObj.Order.DELIVERED},
                        {paymentStatus: 'paid'}
                    ]
                }
            ]
        });

        if (pageSize && currentPage) {
            queryData.skip(Number(pageSize) * (Number(currentPage) - 1)).limit(Number(pageSize))
        }

        data = await queryData.select(select ? select : '').sort({createdAt: -1});

        const dataCount = await Order.countDocuments();

        res.status(200).json({
            data: data,
            count: dataCount,
            message: 'Transaction get Successfully!'
        });
    } catch (err) {
        console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}



exports.getAllOrdersByAdmin = async (req, res, next) => {
    try {
        let pageSize = req.query.pageSize;
        let currentPage = req.query.page;
        let select = req.query.select;
        let query = req.body.query;

        let dataCount;
        let queryData;
        if (query) {
            queryData = Order.find(query);
            dataCount = await Order.countDocuments(query);
        } else {
            queryData = Order.find();
            dataCount = await Order.countDocuments();
        }
        let data;

        if (pageSize && currentPage) {
            queryData.skip(Number(pageSize) * (Number(currentPage) - 1)).limit(Number(pageSize))
        }

        data = await queryData.select(select ? select : '').sort({createdAt: -1});



        res.status(200).json({
            data: data,
            count: dataCount,
            message: 'Order get Successfully!'
        });
    } catch (err) {
        console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllTransactionByAdmin = async (req, res, next) => {
    try {

        let pageSize = req.query.pageSize;
        let currentPage = req.query.page;
        let select = req.query.select;

        let data;
        let queryData;
        queryData = Order.find({
            $and: [
                {
                    $or: [
                        {deliveryStatus: enumObj.Order.DELIVERED},
                        {paymentStatus: 'paid'}
                    ]
                }
            ]
        });

        if (pageSize && currentPage) {
            queryData.skip(Number(pageSize) * (Number(currentPage) - 1)).limit(Number(pageSize))
        }

        data = await queryData.select(select ? select : '').sort({createdAt: -1});

        const dataCount = await Order.countDocuments();

        res.status(200).json({
            data: data,
            count: dataCount,
            message: 'Transaction get Successfully!'
        });
    } catch (err) {
        console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}











exports.getSingleOrderByUser = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId)
            .populate({
                path: 'orderedItems.product',
                model: 'Book',
                select: '_id name slug image price discountPercent availableQuantity author authorName categoryName',
            })

        res.json({
            data: order
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Something went Wrong"
        })
        next(error);
    }
}

exports.getSingleOrderByAdmin = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId).populate({
            path: 'orderedItems.product',
            model: 'Book',
            select: '_id name slug image price discountPercent availableQuantity author authorName categoryName',
        });

        res.json({
            success: true,
            data: order
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Somrthing went Wrong"
        })
        next(error);
    }
}


exports.getUserOrdersByAmin = async (req, res, next) => {
    try {
        const order = await Order.find({userId: req.params.userId});
        res.json({
            success: true,
            data: order
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}


exports.deleteOrderByAdmin = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId);
        const userId = order.userId;

        await User.updateOne(
            {_id: userId},
            {
                $pull: {orders: order._id}
            }
        )

        await Order.findByIdAndDelete(req.params.orderId);

        res.json({
            message: "Order is deleted"
        })


    } catch (err) {
        // console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllCanceledOrdersByAdmin = async (req, res, next) => {
    try {
        const orders = await Order.find({deliveryStatus: 6});
        res.json({
            success: true,
            data: orders
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }

}

exports.getAllOrdersByAdminNoPaginate = async (req, res, next) => {
    try {

        const order = await Order.find();
        const message = "Successfully retrieved orders";

        res.status(200).json({
            data: order,
            message: message
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }

}

exports.changeDeliveryStatus = async (req, res, next) => {
    try {


        // NEW
        const deliveryStatus = req.body.deliveryStatus;

        let updatePhase;

        switch(deliveryStatus) {
            case enumObj.Order.CONFIRM:
                updatePhase = 'orderTimeline.orderPlaced';
                updatePhaseDate = 'orderTimeline.orderPlacedDate';
                nextUpdatePhaseDate = 'orderTimeline.orderProcessingDate';
                break;
            case enumObj.Order.PROCESSING:
                updatePhase = "orderTimeline.orderProcessing";
                updatePhaseDate = 'orderTimeline.orderProcessingDate';
                nextUpdatePhaseDate = 'orderTimeline.orderPickedByDeliveryManDate';
                break;
            case enumObj.Order.SHIPPING:
                updatePhase = 'orderTimeline.orderPickedByDeliveryMan';
                updatePhaseDate = 'orderTimeline.orderPickedByDeliveryManDate';
                nextUpdatePhaseDate = 'orderTimeline.orderDeliveredDate';
                break;
            case enumObj.Order.DELIVERED:
                updatePhase = "orderTimeline.orderDelivered";
                updatePhaseDate = 'orderTimeline.orderDeliveredDate';
                nextUpdatePhaseDate = 'orderTimeline.othersDate';
                break;
            case enumObj.Order.CANCEL:
                updatePhase = "orderTimeline.others";
                updatePhaseDate = 'orderTimeline.othersDate';
                nextUpdatePhaseDate = 'orderTimeline.othersDate';
                break;
            default:
                updatePhase = "orderTimeline.others";
                updatePhaseDate = 'orderTimeline.othersDate';
                nextUpdatePhaseDate = 'orderTimeline.othersDate';
        }

        const updateDate = req.body.updateDate;
        const nextPhaseDate = req.body.nextPhaseDate;
        await Order.findOneAndUpdate({_id: req.body._id}, {
            "$set":
                {
                    [updatePhase]: true,
                    [updatePhaseDate]: updateDate,
                    [nextUpdatePhaseDate]: nextPhaseDate,
                    "deliveryStatus": deliveryStatus
                }
        });

        if(req.body.deliveryStatus === enumObj.Order.CANCEL){
            // console.log(req.body);
            // console.log(req.body._id);
            const user = await Order.findOne({_id: req.body._id});
            // console.log(userId);
            let userId = await User.find({_id: user.user});
            let userRewardPoints = userId[0].rewardPoints;


            const order = await Order.findOne({_id: req.body._id});

            await User.findOneAndUpdate(
                {_id: userId},
                {rewardPoints: userRewardPoints + order.useReward}
            )

            // console.log(order.rewardPoint);
            // let useRewar = order.
        }

        if (req.body.deliveryStatus === enumObj.Order.DELIVERED) {
            await Order.findOneAndUpdate({_id: req.body._id}, {$set: {paymentStatus: 'paid'}});
            const order = await Order.findOne({_id: req.body._id});

            // if (order.orderedItems && order.orderedItems.length) {
            //     order.orderedItems.forEach(item => {
            //         Product.updateOne({_id: item.product}, {$inc: {soldQuantity: item.quantity}}).exec()
            //     });
            // }

            // reward
            const rewardData =  await Reward.findOne();
            const rewardPoint = Math.floor((rewardData.point / rewardData.purchaseAmount) * order.subTotal);

            const userData = await User.findOne({_id: order.user});
            const userRewardPoints = userData.rewardPoints ? userData.rewardPoints : 0;
            const finalRewards = userRewardPoints + rewardPoint;
            await User.findOneAndUpdate({_id: order.user},
                {
                "$set": {"rewardPoints":finalRewards}
            },
                {
                    upsert: true,
                    new: true
                }
            );

        }

        res.json({
            message: "Order status updated",
        })
    } catch (err) {
        console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.filterByDynamicFilters = async (req, res, next) => {

    try {
        let limit = req.body.limit;
        const deliveryStatus = req.query.deliveryStatus;

        // const parent = req.body.parent;
        const queryData = await Order.find({deliveryStatus: deliveryStatus})

        if (limit && limit.pageSize && limit.currentPage) {
            queryData.skip(limit.pageSize * (limit.currentPage - 1)).limit(limit.pageSize)
        }

        const dataCount = await Order.countDocuments({deliveryStatus: deliveryStatus});

        const data = await queryData;

        res.status(200).json({
            data: data,
            count: dataCount
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.filterByDateRange = async (req, res, next) => {

    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const queryData = await Order.find({checkoutDate: { "$gte": startDate, "$lte": endDate }})

        if (limit && limit.pageSize && limit.currentPage) {
            queryData.skip(limit.pageSize * (limit.currentPage - 1)).limit(limit.pageSize)
        }

        const dataCount = await Order.countDocuments({deliveryStatus: query});

        const data = await queryData;

        res.status(200).json({
            data: data,
            count: dataCount
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

function padLeadingZeros(num) {
    return String(num).padStart(4, '0');
}

