const { Schema, model } = require('mongoose');

const UserSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'The field name is required'],
        },
        lastname: {
            type: String,
            required: [true, 'The field lastname is required'],
        },
        email:{
            type: String,
            required: [true, 'The field email is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'The field password is required'],

        },
        avatar:{
            type: String,
            required: [true, 'The field avatar is required'],
        },
        role:{
            type: String,
            enum: ['ADMIN','USER'],
            required: true,
        },
        is_active:{
            alias: 'isActive',
            type: Boolean,
            required: true,
            default: true
        },
        created_in_google:{
            alias: 'createdInGoogle',
            type: Boolean,
            default: false
        },
    },
    { 
        timestamps:  
        { 
            createdAt: 'created_at' ,
            updatedAt: 'updated_at',
        } 
    }
);

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model( 'User', UserSchema );