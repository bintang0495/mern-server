require('./config/mongoose');
const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
// const productRouter = require('./app/product/router');
const productRouterV2 = require('./app/productV2/router');
const cors = require('cors');
const port = process.env.PORT || 3001;
require('dotenv').config();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/v1', productRouter);
app.use('/api/v2', productRouterV2);

app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: 'failed',
    message: `Resource ${req.originalUrl} Not Found`,
  });
});

app.listen(port, () => console.log(`Server berjalan di port ${port}`));
