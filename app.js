/**
 * NODEJS API
 * DATABASE MONGODB
 * VERSION 1.0.0
 * POWERED BY SOFTLAB IT
 * DEVELOP BY MD IQBAL HOSSEN
 */
const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config()

// Cross Unblocked File..
const cors = require('cors');
const errorHandler = require('./middileware/error-handler');

/**
 *  Router File Import
 */
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const subCategoryRoutes = require('./routes/sub-category');
const authorRoutes = require('./routes/author');
const publisherRoutes = require('./routes/publisher');
const bookRoutes = require('./routes/book');
const productRoutes = require('./routes/product');
const bazaarRoutes = require('./routes/bazaar');
const uploadRoutes = require('./routes/upload');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');
const orderRoutes = require('./routes/order');
const shopRoutes = require('./routes/shop');
const homeRoutes = require("./routes/home");
const categoryProductRoutes = require("./routes/category-product");
const reviewControlRoutes = require("./routes/review-control");
const testRoutes = require('./routes/test');
const wishlistRoutes = require('./routes/wishlist');
const couponRoutes = require('./routes/coupon');
const horizontalSubRoutes = require('./routes/horizontalSub');
const companyRoutes = require('./routes/company');
const tagRoutes = require('./routes/tag');
const newsletterRoutes = require('./routes/newsletter');
const rewardRoutes = require("./routes/reward");
const orderTempRoutes = require("./routes/order-temporary");
const blogRoutes = require("./routes/blog");
const contactUsRoutes = require("./routes/contact-us");


const cashRoutes = require("./routes/cash");
const bankRoutes = require("./routes/bank");
const mobileBankRoutes = require("./routes/mobile-bank");
const receivableRoutes = require("./routes/receivable");
const equipmentRoutes = require("./routes/equipment");
const assetInevntoryRoutes = require("./routes/asset-inventory");
const payableRoutes = require("./routes/payable");
const taxRoutes = require("./routes/tax");
const equityRoutes = require("./routes/equity");
const salesRoutes = require("./routes/sales");
const incomeRoutes = require("./routes/income");
const revenueRoutes = require("./routes/revenue");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const costOfSalesRoutes = require("./routes/cost-of-sales");
const expenseInventoryRoutes = require("./routes/expense-inventory");
const paymentMethodRoutes = require("./routes/payment-method");
const courierServiceRoutes = require("./routes/courier-service");
const assetRoutes = require("./routes/asset");

const paymentSSLRoutes = require("./routes/payment-ssl");
const backupRestoreRoutes = require("./routes/backup-restore");
const bulkSmsRoutes = require("./routes/bulk-sms");



/**
 * MAIN APP CONFIG
 * REPLACE BODY PARSER WITH EXPRESS PARSER
 */

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(cors())


/**
 * IMAGE UPLOAD STATIC DIR
 */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/database', express.static(path.join(__dirname, 'database')));


/**
 * MAIN BASE ROUTER WITH IMPORTED ROUTES
 */
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/sub-category', subCategoryRoutes);
app.use('/api/author', authorRoutes);
app.use('/api/publisher', publisherRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/product', productRoutes);
app.use('/api/bazaar', bazaarRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/shop', shopRoutes);
app.use("/api/home", homeRoutes);
app.use('/api/category-product', categoryProductRoutes);
app.use('/api/review-control', reviewControlRoutes);
app.use('/api/test', testRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/horizontalSub', horizontalSubRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/tag', tagRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/reward', rewardRoutes);

app.use('/api/order-temporary', orderTempRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact-us', contactUsRoutes);
app.use('/api/payment-ssl', paymentSSLRoutes);
app.use('/api/backup-restore', backupRestoreRoutes);
app.use('/api/bulk-sms', bulkSmsRoutes);


app.use('/api/cash', cashRoutes);
app.use('/api/bank', bankRoutes);
app.use('/api/mobile-bank', mobileBankRoutes);
app.use('/api/receivable', receivableRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/asset-inventory', assetInevntoryRoutes);
app.use('/api/payable', payableRoutes);
app.use('/api/tax', taxRoutes);
app.use('/api/equity', equityRoutes);
app.use('/api/sale', salesRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/revenue', revenueRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/cost-of-sales', costOfSalesRoutes);
app.use('/api/expense-inventory', expenseInventoryRoutes);
app.use('/api/payment-method', paymentMethodRoutes);
app.use('/api/courier-service', courierServiceRoutes);
app.use('/api/asset', assetRoutes);

/**
 * MAIN BASE GET PATH
 */
app.get('/', (req, res) => {
    res.send('<div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center"><h1 style="color: blueviolet">API RUNNING...</h1><p style="color: lightcoral">Powered by SOFTLAB IT TEAM</p></div>')
})


/**
 * Error Handler
 * 401 UnAuthorized, Access Denied
 * 406 Already Exists, Not Acceptable
 * 404 Not Found
 * 422 Input Validation Error, Unprocessable Entity
 * 500 Database Operation Error, Internal Server Error
 */
app.use(errorHandler.route);
app.use(errorHandler.next);


/**
 * NODEJS SERVER
 * PORT CONTROL
 * MongoDB Connection
 * IF PASSWORD contains @ then encode with https://meyerweb.com/eric/tools/dencoder/
 * Database Name roc-ecommerce
 * User Access authSource roc-ecommerce
 */
mongoose.connect(
    // `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}?authSource=${process.env.AUTH_SOURCE}`,
    `mongodb://localhost:27017/${process.env.DB_NAME}`,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
)
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server is running at port:${port}`));
        console.log('Connected to mongoDB');

    })
    .catch(err => {
        console.error('Oops! Could not connect to mongoDB Cluster0', err);
    })
