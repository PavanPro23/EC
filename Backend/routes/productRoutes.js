const express = require('express')
const {requireSignIn,isAdmin} = require('../middlewares/authMiddleware')
const {createProductController,relatedProductController, productCategoryController, searchProductController, productListController, getProductController, productCountController, getSingleProductController, updateProductController, productPhotoController, deleteProductController, braintreeTokenController ,braintreePaymentController, productFiltersController} = require("../controllers/productController")
const ExpressFormidable = require('express-formidable');

const router = express.Router();

const cloudinary = require('cloudinary');
          
cloudinary.config({ 
  cloud_name: 'dj8ghbc4y', 
  api_key: '425188633668385', 
  api_secret: '1VYmPEYw3eDl8RC95EG22WnU97o' 
});





//create product
router.post('/create-product',requireSignIn, isAdmin, createProductController)


//update product
router.put('/update-product/:pid',requireSignIn, isAdmin, updateProductController);

//get all products
router.get('/get-product',getProductController);

//single product
router.get('/get-product/:slug',getSingleProductController);

//get photo
// router.get('/product-photo/:pid',productPhotoController)

//delete product
router.delete('/delete-product/:pid', deleteProductController);

router.post('/product-filters', productFiltersController);

router.get('/product-count', productCountController);

router.get('/product-list/:page', productListController);

router.get('/related-product/:pid/:cid', relatedProductController);

router.get('/product-category/:slug', productCategoryController);

router.get('/search/:keyword',searchProductController);

//payment
router.get('/braintree/token',braintreeTokenController);

router.post('/braintree/payment', requireSignIn, braintreePaymentController)


router.post('/upload', ExpressFormidable({maxFieldsSize: 5 * 2024 * 2024}), async(req,res)=>{
    try{
        const result = await cloudinary.uploader.upload(req.files.image.path);
        res.json({
            url: result.secure_url,
            public_id: result.public_id
        })
    }
    catch(error){
        console.log(error);
    }
})
module.exports = router;