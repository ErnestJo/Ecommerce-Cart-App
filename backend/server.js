const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');



//load env vars
dotenv.config({ path: './config/config.env' });

// connect to Database
connectDB();


const app = express();
  
// Body parser
app.use(express.json());



// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.PORT} mode on port ${PORT}`.yellow.bold)
);

  // handle unhandle promise rejection
  process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);
    // close down the server
    server.close(() => process.exit(1));
  
  });