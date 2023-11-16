/*
  api/auth
*/
const { Router, response } = require('express')
const { check } = require('express-validator')
const { createUser, login, renewToken } = require('../controllers/auth-controller')
const { fieldValidator } = require('../middlewares/fields-validator')
const { validateJWT } = require('../middlewares/token-validator')

const router = Router()

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Not valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldValidator,
  ],
  createUser,
)

router.post(
  '/login',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Not valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldValidator,
  ],
  login,
)

router.get('/renew', [validateJWT], renewToken)

module.exports = router
