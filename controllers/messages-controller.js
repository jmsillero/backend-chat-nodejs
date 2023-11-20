const Message = require('./models/message')
const fetchMessages = async (req, res) => {
    const myId = req.uid
    const {from} = req.params

    const messages = await Message.find({$or: [{from: myId, to: from}, {from: from, to: myId}]})
        .sort({createdAt: 'desc'})
        .limit(30)

    res.json({ok: true, data: messages})

}


module.exports = {fetchMessages}