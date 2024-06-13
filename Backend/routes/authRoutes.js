const express = require('express');

const router = express.Router();
const { registerController, loginController, orderStatusController, getAllOrdersController, testController, getOrderController, forgotPasswordController, updateProfileController } = require('../controllers/authControllers.js');
const {requireSignIn, isAdmin} = require('../middlewares/authMiddleware.js');

router.post('/register',registerController);
router.post('/login',loginController);
router.post('/forgot-password',forgotPasswordController);
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

//protected route auth
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

router.put('/profile', requireSignIn, updateProfileController)

//orders
router.get('/orders', requireSignIn, getOrderController);

//all orders
router.get('/all-orders',requireSignIn, isAdmin, getAllOrdersController);

//order status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);

module.exports = router;