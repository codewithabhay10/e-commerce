const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Owner Routes');
});





module.exports = router;