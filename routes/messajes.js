/*
 Path: api/message
*/


const {Router} = require('express')
const {validateJWT} = require("../middlewares/token-validator")
const {fetchMessages} = require("../controllers/messages-controller")

const router = Router()


router.get('/:from', [validateJWT], fetchMessages)

module.exports = router