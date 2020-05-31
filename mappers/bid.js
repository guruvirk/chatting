'use strict'

const users = require('./user')
const contests = require('./contest')

exports.toModel = (entity, context) => {
    let model = {
        id: entity.id,
        date: entity.date,
        status: entity.status,
        guest: users.toModel(entity.guest, context),
        contest: (entity.contest && entity.contest.status) ? contests.toModel(entity.contest, context) : null
    }

    return model

}

exports.toSearchModel = (entities, context) => {
    return entities.map((entity) => {
        return exports.toModel(entity, context)
    })
}
