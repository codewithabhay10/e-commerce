const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose-connection');
const config = require('config');

const connect = () => {
    dbgr('Connecting to MongoDB...');
    mongoose.connect(`${config.get('MONGODB_URI')}`)
        .then(() => {
            dbgr('MongoDB connection established successfully');
        })
        .catch((error) => {
            dbgr('MongoDB connection error:', error);
        });
};

module.exports = { connect };

// This code establishes a connection to a MongoDB database using Mongoose.
// It connects to the database using a connection string and logs a success message if the connection is successful.
// If there is an error during the connection, it logs the error message to the console.
// The connection is exported for use in other parts of the application.
// This is useful for managing database operations in a Node.js application, such as creating, reading, updating, and deleting documents in the database.
// The connection string includes the username, password, and database name.
// This code is typically placed in a separate file (like mongoose-connection.js) to keep the database connection logic organized and reusable across the application.  
// The connection is established using the Mongoose library, which provides a straightforward way to interact with MongoDB databases in Node.js applications.
// The connection is made to a MongoDB Atlas cluster, which is a cloud-based MongoDB service.
