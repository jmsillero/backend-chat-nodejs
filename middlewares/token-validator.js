const jwt = require('jsonwebtoken')

const validateJWT = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ ok: false, message: 'Token not valid' })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY)
    req.uid = uid

    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ ok: false, message: 'Not valid token' })
  }
}

module.exports = {
  validateJWT,
}
