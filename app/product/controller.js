const { ObjectId } = require('bson');
const db = require('../../config/mongodb');
const fs = require('fs');
const path = require('path');
require('../../config/server');

const index = (req, res) => {
  const { search } = req.query;
  if (search) {
    db.collection('products')
      .find({ name: new RegExp('.*' + search + '.*') })
      .toArray()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    db.collection('products')
      .find()
      .toArray()
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const view = (req, res) => {
  const { id } = req.params;
  db.collection('products')
    .findOne({ _id: ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const drop = (req, res) => {
  const { id } = req.params;
  db.collection('products')
    .deleteOne({ _id: ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
const store = (req, res) => {
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
  db.collection('products')
    .insertOne({
      name,
      price,
      stock,
      status,
      imageUrl: imgUrl.url,
    })
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
  db.collection('products')
    .updateOne(
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

module.exports = {
  index,
  view,
  store,
  update,
  drop,
};
