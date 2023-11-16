const User = require('./models/user')

const createUser = async (req, res) => {
  const { email } = req.body
  try {
    const emailExist = await User.findOne({ email })
    if (emailExist) {
      return res.status(400).json({ ok: false, message: 'User already register' })
    }

    const user = new User(req.body)
    await user.save()
    res.json({ ok: true, data: user })
  } catch (error) {
    console.log('Error', error)
    res.status(500).json({ ok: false, message: 'Error creating users' })
  }
}

module.exports = {
  createUser,
}
