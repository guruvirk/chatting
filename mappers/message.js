'use strict'

const userMapper = require('./user')

exports.toModel = (entity, context) => {
    var model = {
        id: entity.id,
        body: entity.body,
        date: entity.date,
        status: entity.status,
        timeStamp: entity.timeStamp
    }

    if (entity.from) {
        model.from = userMapper.toTempModel(entity.from)
    }

    model.to = entity.to.map(t => {
        return {
            user: userMapper.toTempModel(t.user),
            viewedOn: t.viewedOn
        }
    })

    if (entity.conversation) {
        model.conversation = entity.conversation._doc ? {
            id: entity.conversation.id
        } : {
                id: entity.conversation.toString()
            }
    }

    return model
}

exports.toSummary = (entity) => {
    var model = {
        id: entity.id,
        body: entity.body,
        date: entity.date,
        status: entity.status,
    }

    if (entity.from) {
        model.from = userMapper.toTempModel(entity.from)
    }

    if (entity.conversation) {
        model.conversation = entity.conversation._doc ? {
            id: entity.conversation.id
        } : {
                id: entity.conversation.toString()
            }
    }

    model.to = entity.to.map(t => {
        return {
            user: userMapper.toTempModel(t.user),
            viewedOn: t.viewedOn
        }
    })

    return model
}

exports.toSearchModel = (entities, context) => {
    return entities.map(entity => {
        return exports.toModel(entity, context)
    })
}
