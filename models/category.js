const { Schema, model } = require('mongoose');

const CategorySchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'The field name is required'],      
            unique: true      
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        is_active:{
            alias: 'isActive',
            type: Boolean,
            default: true
        }
    },
    { 
    timestamps:  
        { 
            createdAt: 'created_at' ,
            updatedAt: 'updated_at',
        } 
    }
);
CategorySchema.methods.toJSON = function() {
    const { __v, ...category } = this.toObject();
    return category;
}
module.exports = model('Category', CategorySchema);