const express = require('express');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user-routes');
const ownerRoutes = require('./routes/owner-routes');
const productRoutes = require('./routes/product-routes');
const db = require('./config/mongoose-connection');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

db.connect(); // Connect to the database
// This code initializes an Express application, sets up middleware for parsing cookies and JSON, and serves static files.

// Initialize Express application
const app = express();
const cors = require("cors")

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'your_session_secret', // Use environment variable or fallback
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
// Set the view engine to EJS
app.set('view engine', 'ejs');


app.use('/api', indexRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


app.listen(5000); // Start the server on port 5000
