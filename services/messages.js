'use strict'
const users = require('./users')
const conversations = require('./conversations')

let populate = 'from to.user conversation'

const set = async (model, entity, context) => {
    if (model.status) {
        entity.status = model.status
    }

    if (model.body) {
        entity.body = model.body
    }
}

exports.create = async (model, context) => {

    console.log('create')

    let message = {
        body: model.body,
        date: new Date(),
    }

    if (model.from) {
        message.from = await users.get(model.from, context)
    } else if (context.user) {
        message.from = context.user
    }

    if (model.conversation) {
        message.conversation = await conversations.get(model.conversation, context)
    }

    message.to = []

    if (model.to === 'everyone') {
        for (let item of conversation.participants) {
            message.to.push(await users.get(item, context))
        }
    } else if (model.to) {
        if (Array.isArray(model.to)) {
            for (let item of model.to) {
                message.to.push({ user: await users.get(item, context) })
            }
        } else {
            message.to.user.push({ user: await users.get(model.to.user || model.to, context) })
        }
    }

    let entity = new db.message(message)
    await entity.save()
    if (message.conversation) {
        message.conversation.lastMessage = entity.id
        await message.conversation.save()
    }
    return entity
}


exports.search = async (query, context, getConversation = true) => {
    let where = {}

    var sortQuery = {
        date: -1
    };

    if (query.status) {
        where['status'] = query.status
    }

    if (query.conversation) {
        if (getConversation) {
            where['conversation'] = await conversations.get(query.conversation, context, false, false)
        } else {
            where['conversation'] = query.conversation
        }
    }

    if (query.to) {
        where['to.user'] = await users.get(query.to, context)
    }

    return db.message.find(where).sort(sortQuery).populate(populate)

}

exports.update = async (id, model, context) => {
    let entity = await db.message.findById(id)
    await set(model, entity, context)
    return entity.save()
}

exports.get = async (query, context) => {
    if (typeof query === 'string') {
        if (query.isObjectId()) {
            return db.message.findById(query).populate('from to.user')
        }
    }
    if (query.id) {
        return db.job.findById(query.id).populate('from to.user')
    }

    return null

}

exports.remove = async (id, context) => {
    return db.message.remove({ _id: id });
}
