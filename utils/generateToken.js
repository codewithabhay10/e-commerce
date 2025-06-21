const jwt = require('jsonwebtoken');


const generateToken = (user) => {
    return jwt.sign(
        {
            email: user.email,
        },
        process.env.JWT_SECRET || 'your_jwt_secret', // Use environment variable or fallback
        { expiresIn: '1h' } // Token expiration time
    );
};

module.exports = { generateToken };