const mongooose = require('mongoose');

const productSchema = new mongooose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
