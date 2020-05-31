'use strict'

const cron = require('cron').CronJob
const db = require('../models')

exports.schedule = () => {
    new cron({
        cronTime: `0 0 0 * * *`,
        onTick: async () => {
            console.log("Started - Set Limit")
            let users = await db.user.find()
            for (const user of users) {
                user.smsLimit = 2
                user.sellLimit = 2
                await user.save()
            }
        },
        start: true
    })
}
