const {io} = require('../index')
const {checkJwt} = require("../helpers/jwt");
const {userConnected, userDisconnected, saveMessage} = require("../controllers/socket");

//Socket messages
io.on('connection', async client => {
    console.log('Client connected')

    const [isValidToken, uid] = checkJwt(client.handshake.headers['authentication'])

    if (!isValidToken) {
        return client.disconnect()
    }

    await userConnected(uid)

    //create room
    client.join(uid)

    client.to(uid)


    client.on('disconnect', async () => {
        await userDisconnected(uid)
    })

    //listen messages

    client.on('private-message', async (payload) => {
        if (await saveMessage(payload)) {
            const {to} = payload
            io.to(to).emit('private-message', payload)
        }
    })

})
