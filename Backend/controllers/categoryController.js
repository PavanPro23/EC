const categoryModel = require("../model/categoryModel");
const slugify = require('slugify');

exports.createCategoryController = async(req,res)=>{
    try{
        const {name} = req.body;
        if(!name){
            return res.status(401).send({
                message: "Name is Required"
            });
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: "Category Already Exist"
            })
        }

        const category = await new categoryModel({name,slug:slugify(name)}).save();
        
        return res.status(200).send({
            success: true,
            message: "Category Created Succesfully",
            category,
        })
        
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in creating Category",
            error,
        })
    }
}

exports.updateCategoryController = async(req,res) =>{
    try{
        const {name} = req.body;
        const {id} = req.params;

        const category =  await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        return res.status(200).send({
            success: true,
            message: "Category Updated Succesfully",
            category,
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in updating Category",
            error,
        })
    }
}

exports.categoryController = async(req,res)=>{
    try{
        const category = await categoryModel.find({});
        return res.status(200).send({
            success: true,
            message: "All Category Lists",
            category,
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in getting Category list",
            error,
        })
    }
}

//single cateogry
exports.singleCategoryController = async(req,res)=>{

    try{

        const category = await categoryModel.findOne({slug:req.params.slug});
        return res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category,
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in getting Single Category",
            error,
        })
    }
}

exports.deleteCategoryController = async(req,res)=>{
    try{
        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "Category Deleted Successfully",
            category,
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Deleting Category",
            error,
        })
    }
}