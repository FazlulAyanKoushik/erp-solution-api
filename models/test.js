const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');


const schema = new Schema(
    {
        name: {
            type: String,
        },
        username: {
            type: String
        },

        description: {
            type: String
        }
    }, {
        timestamps: true
    }
);

schema.plugin(mongoose_fuzzy_searching, { fields: ['name', 'username'] });
module.exports = mongoose.model('Test', schema);
