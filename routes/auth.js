/*
  api/auth
*/
const { Router, response } = require('express')
const { check} = require('express-validator')
const { createUser } = require('../controllers/auth-controller')
const { fieldValidator } = require('../middlewares/fields-validator')

const router = Router()

router.post(
  '/register',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(), 
    check('email', 'Not valid email').isEmail(), 
    check('password', 'Password is required').not().isEmpty(),
    fieldValidator
  ],
  createUser,
)

module.exports = router
