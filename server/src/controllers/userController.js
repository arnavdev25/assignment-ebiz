const userService = require('../services/userService')
const validationHelper = require('../helpers/validation')
const app_constants = require('../constants/app.json')


exports.userSignup = async (req, res) => {
    try {
        const required_fields = ['first_name', 'email', 'password']
        const { is_err, error } = validationHelper.validation(required_fields, req.body)

        if (is_err) {
            return res.json({ success: 0, status: app_constants.BAD_REQUEST, message: error, result: {} })
        }

        const user_signup = await userService.userSignup(req.body)
        return res.json(user_signup)
    }
    catch (ex) {
        console.log(ex);

    }
}


exports.userLogin = async (req, res) => {
    try {
        const required_fields = ['email', 'password']
        const { is_err, error } = validationHelper.validation(required_fields, req.body)

        if (is_err) {
            return res.json({ success: 0, status: app_constants.BAD_REQUEST, message: error, result: {} })
        }

        const user_login = await userService.userLogin(req.body)
        return res.json(user_login)
    }
    catch (ex) {
        console.log(ex);
    }
}


exports.changePassword = async (req, res) => {
    try {
        const required_fields = ['password']
        const { is_err, error } = validationHelper.validation(required_fields, req.body)

        if (is_err) {
            return res.json({ success: 0, status: app_constants.BAD_REQUEST, message: error, result: {} })
        }

        req.body.auth_user_id = req.user
        const change_password = await userService.changePassword(req.body)
        return res.json(change_password)
    }
    catch (ex) {
        console.log(ex);
    }
}


exports.updateUser = async (req, res) => {
    try {
        req.body.auth_user_id = req.user
        const update_user = await userService.updateUser(req.body)
        return res.json(update_user)
    }
    catch (ex) {
        console.log(ex);
    }
}