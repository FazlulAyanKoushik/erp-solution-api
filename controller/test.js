const faker = require('faker');

const Test = require('../models/test');


// Tests
const getArrayFieldData = async (req, res, next) => {

    const authorId = '5fee4440a76bce01b0774c90';
    const filter = {_id: authorId}

    // db.blogs.find({}, {posts:{$slice: [10, 10]}}) // skip 10, limit 10

    try {
        const result = await Book.findOne(
            filter,
            {
                tests: {$slice: [0, 2]}
            }
        ).exec()

        res.status(200).json({
            data: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

const removeArrayFieldData = async (req, res, next) => {

    const authorId = '5fee4440a76bce01b0774c90';
    const filter = {_id: authorId}

    try {
        const result = await Book.updateOne(
            filter,
            {
                $pullAll: {tests: ['id7']}
            }
        ).exec()

        res.status(200).json({
            data: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

const addTenKDummyData = async (req, res, next) => {

    const totalNumber = 1000;

    for (let i = 0; i < totalNumber; i++) {
        const team = new Test({
            name: faker.name.findName(),
            username: faker.internet.userName(),
            description: faker.lorem.paragraph()
        })
        team.save()
    }

    res.status(200).json({
        data: 'success'
    });

}

const getExplainQuery = async (req, res, next) => {

    // const authorId = '5fee4440a76bce01b0774c90';
    const filter = {name: 'Tami Stokes'}


    try {
        const result = await Test.find(
            filter
        ).lean()

        res.status(200).json({
            data: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

const getSearchByText = async (req, res, next) => {
    try {
        const query = req.query.q;

        const results = await Test.fuzzySearch({query: query, prefixOnly: false, minSize: 1})
        console.log(results.length)

        res.status(200).json({
            data: results
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}


// Tests
exports.getArrayFieldData = getArrayFieldData
exports.removeArrayFieldData = removeArrayFieldData
exports.addTenKDummyData = addTenKDummyData
exports.getExplainQuery = getExplainQuery
exports.getSearchByText = getSearchByText
