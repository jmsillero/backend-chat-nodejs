const bcrypt = require('bcryptjs')
const User = require('./models/user')
const { generateJwt } = require('../helpers/jwt')

const createUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const emailExist = await User.findOne({ email })
    if (emailExist) {
      return res.status(400).json({ ok: false, message: 'User already register' })
    }

    const user = new User(req.body)
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)
    await user.save()

    //generate token...
    const token = await generateJwt(user.id)

    res.json({ ok: true, data: { user, token } })
  } catch (error) {
    console.log('Error', error)
    res.status(500).json({ ok: false, message: 'Error creating users' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ ok: false, message: 'User not found' })
    }

    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(404).json({ ok: false, message: 'Not valid signatures' })
    }
    //Generate webToken....
    const token = await generateJwt(user.id)
    res.json({ ok: true, data: { user, token } })
  } catch (error) {
    console.log('Error login user')
    return res.status(500).json({ ok: false, message: 'An error occured' })
  }
}

const renewToken = async (req, res) => {
  const { uid } = req
  const token = await generateJwt(uid)

  try {
    const user = await User.findById(uid)
    return res.json({ ok: true, data: { user, token } })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ ok: false, message: 'An error occured' })
  }
}

module.exports = {
  createUser,
  login,
  renewToken,
}
