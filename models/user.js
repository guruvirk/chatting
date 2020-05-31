'use strict'
var mongoose = require('mongoose')
module.exports = {
    code: String,
    email: {
        type: String,
        lowercase: true
    },
    phone: String,
    name: {
        type: String,
        lowercase: true
    },
    password: String,
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive', 'blocked']
    }
}
