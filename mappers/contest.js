'use strict'

const users = require('./user')
const transactions = require('./transaction')
const bids = require('./bid')

exports.toModel = (entity, context) => {
    let model = {
        id: entity.id,
        code: entity.code,
        coins: entity.coins,
        date: entity.date,
        status: entity.status,
        roomCode: entity.roomCode,
        host: users.toModel(entity.host, context),
        guest: entity.guest ? users.toModel(entity.guest, context) : null,
        hostTransaction: entity.hostTransaction ? transactions.toModel(entity.hostTransaction, context) : null,
        guestTransaction: entity.guestTransaction ? transactions.toModel(entity.guestTransaction, context) : null,
        hostResult: entity.hostResult,
        hostImage: entity.hostImage,
        hostVideo: entity.hostVideo,
        hostCancelReason: entity.hostCancelReason,
        guestResult: entity.guestResult,
        guestImage: entity.guestImage,
        guestVideo: entity.guestVideo,
        guestCancelReason: entity.guestCancelReason,
        winner: entity.winner ? users.toModel(entity.winner, context) : null,
        bids: (entity.bids && entity.bids.length) ? bids.toSearchModel(entity.bids, context) : null,
    }

    return model

}

exports.toSearchModel = (entities, context) => {
    return entities.map((entity) => {
        return exports.toModel(entity, context)
    })
}
