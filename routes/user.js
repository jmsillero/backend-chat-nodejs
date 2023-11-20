/*
Route:
api/users

 */

const {Router} = require('express')
const {validateJWT} = require("../middlewares/token-validator");
const {getUsers} = require("../controllers/user-controller");

const router = Router()

router.get('/',[validateJWT], getUsers)

module.exports = router