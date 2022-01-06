const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        authorName: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        image: {
            type: String,
        },
        about: {
            type: String
        },
        books: [{
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }]
    }
)

module.exports = mongoose.model('Author', schema);
