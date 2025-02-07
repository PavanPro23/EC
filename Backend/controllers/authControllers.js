const { hashPassword, comparePassword } = require('../helper/authHelper.js');
const orderModel = require('../model/orderModel.js');
const userModel = require('../model/userModel.js');
const JWT = require('jsonwebtoken');

exports.registerController = async (req,res) =>{
    try{
        const {name,email,password,phone,address, answer} = req.body;

        if(!name){
            return res.send({error:"Name is required"});
        }
        if(!email){
            return res.send({error: "Email is required"});
        }
        if(!password){
            return res.send({error: "Password is required"});
        }
        if(!phone){
            return res.send({error: "Phone Number is required"});
        }
        if(!address){
            return res.send({error: "Address is required"});
        }
        if(!answer){
            return res.send({error: "Answer is required"});
        }

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Already Registered, PLease Login.."
            })
        }


        const hashedPassword = await hashPassword(password);


        const user =  new userModel({name,email,password: hashedPassword,phone,address, answer });
        await user.save();



        res.status(201).send({
            success:true,
            message:"User Registered Successfully.",
            user,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error,
        });
    }
}

exports.loginController = async(req,res)=>{
    try{

        const {email,password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Incorrect email or password"
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }

        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = await JWT.sign({_id: user._id }, process.env.JWT_SECRET, { expiresIn:"7d" });

        res.status(200).send({
            success:true,
            message:"User Login Successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token,
        })
    }
    catch(error){

        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error,
        });

    }
}

exports.forgotPasswordController = async (req,res) =>{

    try{
        const {email, answer, newPassword} = req.body;
        if(!answer){
            return res.send({error:"Answer is required"});
        }
        if(!email){
            return res.send({error: "Email is required"});
        }
        if(!newPassword){
            return res.send({error: "New Password is required"});
        }

        const user = await userModel.findOne({email,answer});
        if(!user){
            return res.status(400).send({
                success:false,
                message:"Incorrect Email or Answer"
            })
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(201).send({
            success:true,
            message:"Password Reset Successfully.",
            user,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error,
        });
    }
}

exports.testController = (req,res)=>{
    res.send('protected admin');
}

exports.updateProfileController = async(req,res)=>{
    try {
        const {name,email,password,address,phone} = req.body;
        const user = await userModel.findById(req.user._id);
        if(password && password.length < 6){
            return res.json({error:"Password is required and must have 6 characters long"});
        }

        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            name : name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        },{new: true})

        res.status(201).send({
            success:true,
            message:"Profile Updated Successfully.",
            updatedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while updating User Profile",
            error,
        });
    }
}

exports.getOrderController = async(req,res)=>{
    try {
        const orders = await orderModel.find({buyer:req.user._id}).populate("products").populate("buyer","name")
        res.json(orders);
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while getting orders",
            error,
        });
    }
}

exports.getAllOrdersController = async(req,res)=>{
    try{
        const orders = await orderModel.find({}).populate("products").populate("buyer","name").sort({createdAt: -1});
        res.json(orders);
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while getting all orders",
            error,
        });
    }
}

exports.orderStatusController = async(req,res)=>{
    try{
        const {orderId} = req.params;
        const {status} = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, {status}, {new: true});
        res.json(orders);
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while updating orders",
            error,
        });
    }
}