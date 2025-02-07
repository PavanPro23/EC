const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
    },
    quantity:{
        type:Number,
        required: true,
    },
    photo:{
        type: String,
        required: true,
    },
    shipping:{
        type:Boolean,
    }
},{timestamps:true});

module.exports = mongoose.model('Products',productSchema);