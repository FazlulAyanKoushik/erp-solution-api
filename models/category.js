const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        categoryName: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        books: [{
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }]
    }
)

module.exports = mongoose.model('Category', schema);
