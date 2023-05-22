const { Schema, model } = require('mongoose');

const ProductSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'The field name is required'],      
        }, 
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'The field user is required'],      
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'The field category is required'],      
        },   
        price: {
            type: Number,
            default: 0 ,
            required: [true, 'The field price is required'],      
        },
        quantity: {
            type: Number,
            default: 0 ,
            required: [true, 'The field quantity is required'],            
        },
        is_active:{
            alias: 'isActive',
            type: Boolean,
            default: true
        },   
        available:{
            type: Boolean,
            default: true
        },    
    },
    {
        timestamps:  
        { 
            createdAt: 'created_at' ,
            updatedAt: 'updated_at'
        } 
    }
);

ProductSchema.methods.toJSON = function() {
    const { __v, ...product } = this.toObject();
    return product;
}

module.exports = model('Product', ProductSchema );