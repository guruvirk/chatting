'use strict'

const users = require('./user')

exports.toModel = (entity, context) => {
    let model = {
        id: entity.id,
        coins: entity.coins,
        date: entity.date,
        status: entity.status,
        type: entity.type,
        transactionId: entity.transactionId,
        accNo: entity.accNo,
        upi: entity.upi,
        label: entity.label,
        user: entity.user ? users.toModel(entity.user, context) : null
    }

    return model

}

exports.toSearchModel = (entities, context) => {
    return entities.map((entity) => {
        return exports.toModel(entity, context)
    })
}
