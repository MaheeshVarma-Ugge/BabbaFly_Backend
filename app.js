const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Home Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to BabbaFly Backend API'
  });
});

// API Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/listings', require('./routes/listingRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Error Middleware
app.use(require('./middleware/errorMiddleware'));

module.exports = app;
