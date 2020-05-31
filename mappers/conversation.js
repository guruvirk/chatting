
let messageMapper = require('./message')
let userMapper = require('./user')

exports.toModel = (entity, context) => {
    var model = {
        id: entity.id,
        name: entity.name,
        type: entity.type,
        status: entity.status,
        timeStamp: entity.timeStamp,
        unread: entity.unread
    }

    if (entity.lastMessage) {
        model.lastMessage = messageMapper.toSummary(entity.lastMessage)
    }

    if(entity.messages) {
        model.messages = entity.messages.map(p => messageMapper.toSummary(p))
    }

    model.participants = entity.participants.map(p => userMapper.toTempModel(p))

    return model
}
