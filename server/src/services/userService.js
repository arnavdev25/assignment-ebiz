const User = require("../models/userModel");
const bcrypt = require('bcrypt')
const app_constants = require('../constants/app.json')
const jwt = require('jsonwebtoken')
require('dotenv').config();


exports.userSignup = async (data) => {
    const { password, email } = data;

    const user_exist = await User.findOne({ email })
    if (user_exist) {
        return { success: 0, status: app_constants.BAD_REQUEST, message: 'Email already exist!', result: {} }
    }

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    const add_user = await User.create({
        ...data, password: hash_password
    })

    if (add_user) {
        return { success: 1, status: app_constants.SUCCESS, message: 'User signed up successfully!', result: {} }
    }

    return { success: 0, status: app_constants.INTERNAL_SERVER_ERROR, message: 'Internal server error!', result: {} }
}


exports.userLogin = async (data) => {
    const { password, email } = data;

    const user_exist = await User.findOne({ email })
    if (!user_exist) {
        return { success: 0, status: app_constants.BAD_REQUEST, message: 'Email does not exist!', result: {} }
    }

    const compare_password = await bcrypt.compare(password, user_exist.password);
    if (!compare_password) {
        return { success: 0, status: app_constants.BAD_REQUEST, message: 'Invalid credentials!', result: {} }
    }

    const token = await jwt.sign({ id: user_exist._id }, process.env.JWT_SECRET_KEY)

    if (token) {
        return { success: 1, status: app_constants.SUCCESS, message: 'User logged in successfully!', result: { ...user_exist['_doc'], token } }
    }

    return { success: 0, status: app_constants.INTERNAL_SERVER_ERROR, message: 'Internal server error!', result: {} }
}


exports.changePassword = async (data) => {
    const { password, auth_user_id } = data;

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    const change_password = await User.updateOne(
        { _id: auth_user_id },
        { $set: { password: hash_password } }
    )

    if (change_password) {
        return { success: 1, status: app_constants.SUCCESS, message: 'Password changed successfully!', result: {} }
    }

    return { success: 0, status: app_constants.INTERNAL_SERVER_ERROR, message: 'Internal server error!', result: {} }
}


exports.updateUser = async (data) => {
    const { auth_user_id } = data;
    if (data.password) {
        delete data.password
    }

    if (data.email) {
        const email_check = await User.findOne({ email: data.email, _id: { $ne: auth_user_id } })
        if (email_check) {
            return { success: 0, status: app_constants.BAD_REQUEST, message: 'Email already exist!', result: {} }
        }
    }

    const update_user = await User.updateOne(
        { _id: auth_user_id },
        { $set: { ...data } }
    )

    if (update_user) {
        return { success: 1, status: app_constants.SUCCESS, message: 'User updated successfully!', result: {} }
    }

    return { success: 0, status: app_constants.INTERNAL_SERVER_ERROR, message: 'Internal server error!', result: {} }
}