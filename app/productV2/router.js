const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const controller = require('./controller');

router.get('/product', controller.index);
router.get('/product/:id', controller.view);
router.delete('/product/:id', controller.drop);
router.post('/product', upload.single('image'), controller.store);
router.put('/product/:id', upload.single('image'), controller.update);

module.exports = router;
