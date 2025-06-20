const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        default: []
    },
    gstin: String,
    picture: {
        type: String,
        default: 'https://res.cloudinary.com/dz1qj3x8h/image/upload/v1698858700/avatars/default-avatar.png'
    }
}, { timestamps: true });

module.exports = mongoose.model('Owner', ownerSchema);
