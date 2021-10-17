const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();


//Diffrenrt functions => Create,find, update, delete
router.get('/', productController.view);
router.post('/', productController.find);
router.post('/', productController.findSerial);


router.get('/addProduct', productController.formAdd);
router.post('/addProduct', productController.create);

router.get('/editProduct/:id', productController.edit);
router.post('/editProduct/:id', productController.update);

router.get('/viewProduct/:id', productController.viewSingle);
router.get('/:id', productController.delete);
//Router
router.get('', (req, res) => {
    res.render('home');
});

module.exports = router;