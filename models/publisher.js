const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        publisherName: {
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

module.exports = mongoose.model('Publisher', schema);
