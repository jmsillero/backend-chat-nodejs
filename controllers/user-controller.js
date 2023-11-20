const User = require('./models/user')
const {query} = require("express-validator");
const getUsers = async (req, res) => {

    const start = Number(req.query.start) || 0
    const count = Number(req.query.count) || 10

    const users = await User
        .find({_id: {$ne: req.uid}})
        .sort('-online')
        .skip(start)
        .limit(count)

    res.json({ok: true, data: users})
}

module.exports = {getUsers}