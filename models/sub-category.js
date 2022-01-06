const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        subCatName: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        parentCategory: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        parentCategoryName: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('SubCategory', schema);
