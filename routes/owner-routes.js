const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");


router.get('/', (_req, res) => {
    res.send('Owner Routes');
});

if (process.env.NODE_ENV === "development") {
    router.post('/create', async (req, res) => {
        if (!req.body) {
            return res.status(400).json({ error: 'Request body is missing' });
        }
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(400).json({ message: "Owners already exist" });
        }
        const { fullname, email, password } = req.body;
        // Validate request body
        if (!fullname || !email || !password) {
            return res.status(400).json({ error: 'Name , email , password are required' });
        }
        const newOwner = await ownerModel.create({ fullname, email, password });
        res.status(201).send(newOwner);
    });
}


module.exports = router;