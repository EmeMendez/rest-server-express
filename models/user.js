const { Schema, model } = require('mongoose');

const UserSchema = Schema({
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
    isActive:{
        type: Boolean,
        required: true,
        default: true
    },
    createdInGoogle:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: null
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = model( 'User', UserSchema );