const express = require('express');
const lesson_routes = require('./routes/lessons');
const order_routes = require('./routes/orders');
const review_routes = require('./routes/reviews');
const logger = require('./middlewares/logger');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middlewares/credentials');


const app = express();

const port = 3000;

app.use(express.json());

app.use(credentials);

app.use(cors(corsOptions));

// Use the logger middleware for all routes
app.use(logger);

// routes
app.use('/api/lessons', lesson_routes);
app.use('/api/orders', order_routes);
app.use('/api/reviews', review_routes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
