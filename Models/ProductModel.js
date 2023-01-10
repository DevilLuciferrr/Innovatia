import mongoose from 'mongoose';

const reviewSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    rating:{
        type:String,
        require:true
    },
    comment:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    }
});

const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    reviews:[reviewSchema],
    rating:{
        type:Number,
        require:true,
        default:0
    },
    numReviews:{
        type:Number,
        require:true,
        default:0
    },
    price:{
        type:Number,
        require:true,
        default:0
    },
    countInStock:{
        type:Number,
        require:true,
        default:0
    }
},
{
    timestamps:true
})

const Prouct = mongoose.model("Prouct",ProductSchema)

export default Prouct;