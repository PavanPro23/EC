const express = require('express');
const {requireSignIn,isAdmin} = require('../middlewares/authMiddleware')
const {createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController} = require("../controllers/categoryController")

const router = express.Router();

//create-category
router.post('/create-category',requireSignIn, isAdmin, createCategoryController)

//update-category
router.put('/update-category/:id',requireSignIn, isAdmin, updateCategoryController);

//Get All Category
router.get('/get-category', categoryController);

//single category
router.get('/single-category/:slug',singleCategoryController)

//delete category
router.delete('/delete-category/:id',requireSignIn, isAdmin, deleteCategoryController);
module.exports = router;