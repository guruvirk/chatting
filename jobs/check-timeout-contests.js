'use strict'

const cron = require('cron').CronJob
const db = require('../models')
var moment = require('moment')

exports.schedule = () => {
    new cron({
        cronTime: `0 * * * * *`,
        onTick: async () => {
            console.log("Started - Check Timeout")
            let time = moment().subtract(2, 'hours').toDate()
            let contests = await db.contest.find({
                status: {
                    $in: ["ready", "ongoing"]
                },
                lastUpdate: {
                    $lte: time
                }
            })
            for (const contest of contests) {
                contest.status = "timedOut"
                await contest.save()
            }
        },
        start: true
    })
}
