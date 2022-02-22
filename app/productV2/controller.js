const path = require('path');
const fs = require('fs');
const router = require('./router');
const Product = require('./model');
const { ObjectId } = require('bson');
const server = require('../../config/server');
require('../../config/server');

const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    Product.create({
      name,
      price,
      stock,
      status,
      imageUrl: `${server}/public/${image.originalname}`,
    })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    Product.create({
      name,
      price,
      stock,
      status,
      imageUrl: ``,
    })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const index = (req, res) => {
  let { search } = req.query;
  if (search) {
    Product.find({ name: new RegExp('.*' + search + '.*') })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    Product.find()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const view = (req, res) => {
  const { id } = req.params;
  Product.findOne({ _id: ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const drop = (req, res) => {
  const { id } = req.params;
  Product.deleteOne({ _id: ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const update = (req, res) => {
  const { id } = req.params;
  const { name, price, stock, status } = req.body;
  const image = req.file;
  let imgUrl = {
    url: '',
  };
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    imgUrl = {
      url: `${server}/public/${image.originalname}`,
    };
  }
  Product.updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        name,
        price,
        stock,
        status,
        imageUrl: imgUrl.url,
      },
    }
  )
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = { store, index, view, drop, update };
