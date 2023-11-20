const jwt = require('jsonwebtoken')

const generateJwt = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {uid}
        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: '12h',
            },
            (err, token) => {
                if (err) {
                    reject('Cannot created token')
                } else {
                    resolve(token)
                }
            },
        )
    })
}

const checkJwt = (token = '') => {
    try {
        const {uid} = jwt.verify(token, process.env.SECRET_KEY)
        return [true, uid]
    } catch (e) {
        console.log('Error', e)
        return [false, undefined]
    }
}

module.exports = {
    generateJwt,
    checkJwt
}
