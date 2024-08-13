const app_constants = require('../constants/app.json')
const jwt = require('jsonwebtoken')
require('dotenv').config();


exports.verifyToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.json({ success: 0, status: app_constants.UNAUTHORIZED, message: 'Please pass the token!', result: {} })
    }

    const token = authorization.replace("Bearer ", "")
    if (!token) {
        return res.json({ success: 0, status: app_constants.UNAUTHORIZED, message: 'Please pass the valid token!', result: {} })
    }

    const check_token = jwt.verify(token, process.env.JWT_SECRET_KEY)

    if (!check_token) {
        return res.json({ success: 0, status: app_constants.UNAUTHORIZED, message: 'Invalid token!', result: {} })
    }

    req.user = check_token.id;
    next();
}