'use strict'
var mongoose = require('mongoose')
module.exports = {
    body: String,
    date: Date,
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    to: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        viewedOn: Date,
    }],
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'conversation'
    },
    status: {
        type: String,
        default: 'delivered',
        enum: ['delivered']
    }
}
