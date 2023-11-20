const User = require('./models/user')
const Message = require('./models/message')
const userConnected = async (uid = '') => {
    const user = await User.findById(uid)
    user.online = true
    await user.save()
    console.log('User connected', user.name)
    return user;
}


const userDisconnected = async (uid = '') => {
    const user = await User.findById(uid)
    user.online = false
    await user.save()
    console.log('User disconnected', user.name)
    return user;
}

const saveMessage = async (payload) => {
    try {
        const message = new Message(payload)
        await message.save()
        return true
    } catch (e) {

        console.log(e)
        return false
    }
}


module.exports = {userConnected, userDisconnected, saveMessage}