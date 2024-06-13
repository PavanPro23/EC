const fs = require('fs')
const productModel = require('../model/prodctModel')
const categoryModel = require('../model/categoryModel')
const slugify = require('slugify')
var braintree = require('braintree')
const dotenv = require('dotenv');
const orderModel = require('../model/orderModel')

dotenv.config();
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

exports.createProductController = async(req,res) =>{
    try{
        const {name, description, price, photo, category, quantity, shipping} = req.body;

        switch(true){
            case !name:
                return res.status(500).send({
                    error: "Name is Required"
                });  
                
            case !description:
                return res.status(500).send({
                    error: "Description is Required"
                });  
            
            case !price:
                return res.status(500).send({
                    error: "Price is Required"
                });  

            case !category:
                return res.status(500).send({
                    error: "Category is Required"
                });  

            case !quantity:
                return res.status(500).send({
                    error: "Quantity is Required"
                });  

            case !photo:
                return res.status(400).send({
                    error: "Image is required"
                });  
        }

        const products = new productModel({
            name, description, price, category, photo, quantity, shipping, slug: slugify(name)
        });

        await products.save();
        return res.status(201).send({
            success: true,
            message: "Product Created Succesfully",
            products,
        })
    }
    catch(error){
        console.log(error);
    }
}

exports.getProductController = async(req,res)=>{
    try{
        const products = await productModel.find({}).populate("category");
        return res.status(200).send({
            success: true,
            message: "All Products fetched Succesfully",
            products,
        })
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: "Error in Getting Product",
            error,
        })
    }
}

exports.getSingleProductController = async(req,res)=>{
    try{
        const product = await productModel.findOne({slug:req.params.slug}).populate("category");
        return res.status(200).send({
            success: true,
            message: "Product fetched Succesfully",
            product,
        })
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: "Error in Getting Single Product",
            error,
        })
    }
}

// exports.productPhotoController = async(req,res)=>{
//     try{
//         const product = await productModel.findById(req.params.pid).select("photo");
//         if(product.photo.data){
//             res.set("Content-type",product.photo.contentType);
//             return res.status(200).send(product.photo.data)
//         }
        
//     }
//     catch(error){
//         return res.status(500).send({
//             success: false,
//             message: "Error in Getting Photo",
//             error,
//         })
//     }
// }

exports.deleteProductController = async(req,res)=>{
    try{
        const product = await productModel.findByIdAndDelete(req.params.pid);
        return res.status(200).send({
            success: true,
            message: "Product Deleted Succesfully",
            product,
        })
        
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: "Error in Deleting Product",
            error,
        })
    }
}

exports.updateProductController = async (req, res) => {
    try {
        const {name, description, price, photo, category, quantity, shipping} = req.body;

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });    
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case !photo:
                return res.status(500).send({ error: "Photo is Required" });

        }

        const products = await productModel.findByIdAndUpdate(req.params.pid, { name, description, price, category, photo, quantity, shipping, slug: slugify(name) }, { new: true });
        await products.save();
        return res.status(201).send({
            success: true,
            message: "Product updated Successfully",
            products,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In updating product",
            error
        })
    }
}

exports.productFiltersController = async(req,res)=>{
    try{
        const {checked, radio} = req.body;
        let args = {};

        if(checked.length > 0 ) 
            args.category = {$in: checked};

        if(radio.length) 
            args.price = {$gte:radio[0], $lte:radio[1]};

        const products = await productModel.find(args);

        res.status(200).send({
            success:true,
            products
        })

    }catch (error) {
        console.log(error.message)
        return res.status(500).send({
            success: false,
            message: "Error In Filtering product",
            error
        })
    }
}

exports.productCountController = async(req,res)=>{
    try{
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In counting product",
            error
        })
    }
}

exports.productListController = async(req,res)=>{
    try{
        const perPage = 3;
        const page = req.params.page ? req.params.page : 1;

        const products = await productModel.find({}).skip((page-1)*perPage).limit(perPage).sort({createdAt: -1});

        res.status(200).send({
            success:true,
            products
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In per page count",
            error
        })
    }
}

exports.searchProductController = async(req,res)=>{
    try{
        const {keyword} = req.params;
        const results = await productModel.find({
            $or : [
                {name : {$regex:keyword , $options:'i'}},
                {description: {$regex:keyword, $options:'i'}},
            ]
        })
        res.json(results);
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In per page count",
            error
        })
    }
}

exports.relatedProductController = async(req,res)=>{
    try{
        const {pid, cid} = req.params;
        const products = await productModel.find({
            category:cid,
            _id:{$ne:pid},
        }).limit(3).populate("category")

        res.status(200).send({
            success: true,
            products,
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In getting related products",
            error
        })
    }
}

exports.productCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        const products = await productModel.find({category}).populate('category');
        
        res.status(200).send({
            success: true,
            category,
            products,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In getting products",
            error
        })
    }
}

exports.braintreeTokenController = async(req,res)=>{
    try{
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err);
            }
            else{
                res.send(response);
            }
        })
    }catch(error){
        console.log(error);
    }
}

exports.braintreePaymentController = (req,res)=>{
    try{
        const {cart,nonce} = req.body;
        let total = 0;
        cart.map((i)=>{
            total += i.price;
        })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options:{
                submitForSettlement: true
            }
        },

            function(error,result){
                if(result){
                    const order = new orderModel({
                        products:cart,
                        payment:result,
                        buyer:req.user._id
                    }).save()
                    res.json({ok: true})
                }else{
                    res.status(500).send(error)
                }
            }
        )
    }catch(error){
        console.log(error);
    }
}