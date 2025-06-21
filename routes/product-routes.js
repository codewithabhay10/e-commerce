const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model'); // Assuming you have a product model
// Importing multer configuration for file uploads
// This is a product routes file that handles product-related endpoints

router.get('/', (req, res) => {
    res.send('Product Routes');
});

router.post('/create', upload.single('image'), (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing' });
    }

    const { name, price , discount , bgcolor , panelcolor , textcolor } = req.body;

    // Validate request body
    if (!name || !price || !req.file) {
        return res.status(400).json({ error: 'Name, price, and description are required' });
    }

    const newProduct = {
        name,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        },
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    };

    productModel.create(newProduct)
        .then(product => {
           res.redirect('/owners/admin');
        })
        .catch(err => {
            res.status(500).json({ error: 'Error creating product', details: err.message });
        });
});

module.exports = router;