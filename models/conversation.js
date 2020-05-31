var mongoose = require('mongoose')

module.exports = {
    name: String,
    type: {
        type: String,
        enum: ['group', 'direct']
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'in-active']
    }
}
