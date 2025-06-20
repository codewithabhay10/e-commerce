const express = require('express');
const userRoutes = require('./routes/user-routes');
const ownerRoutes = require('./routes/owner-routes');
const productRoutes = require('./routes/product-routes');
const db = require('./config/mongoose-connection');
const path = require('path');
const cookieParser = require('cookie-parser');

// Initialize Express application
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/owners', ownerRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

