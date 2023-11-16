const { validationResult } = require('express-validator')

const createUser = (req, res) => {
  res.json({ ok: true, message: 'User created!' })
}

module.exports = {
  createUser,
}
