'use strict'

exports.toTempModel = (entity, context) => {
    let user = {
        id: entity.id,
        code: entity.code,
        email: entity.email,
        phone: entity.phone,
    }

    return user

}

exports.toSessionModel = (entity) => {
    let model = {
        id: entity.id,
        code: entity.code,
        email: entity.email,
        phone: entity.phone,
        name: entity.name,
    }

    if (entity.session) {
        model.session = {
            id: entity.session.id,
            timeStamp: entity.session.timeStamp,
            status: entity.session.status,
            expiry: entity.session.expiry
        }
    }

    return model
}

exports.toModel = (entity, context) => {
    let model = {
        id: entity.id,
        code: entity.code,
        name: entity.name,
        email: entity.email,
        phone: entity.phone,
        status: entity.status,
    }

    return model
}

exports.toSearchModel = (entities, context) => {
    return entities.map((entity) => {
        return exports.toModel(entity, context)
    })
}
