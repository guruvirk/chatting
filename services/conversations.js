const userService = require('./users')
const messageService = require('./messages')

getUnread = async (items, user, context) => {
    for (const item of items) {
        await getUnreadSingle(item, user, context)
    }
}

getUnreadSingle = async (item, user, context) => {
    let messages = await messageService.search({ conversation: item, to: user }, context, false)
    item.unread = 0
    for (const message of messages) {
        for (const to of message.to) {
            if (to.user.id == user.id && !to.viewedOn) {
                item.unread++
            }
        }
    }
}


const set = async (model, entity, context) => {
    if (model.name) {
        entity.name = model.name
    }

    if (model.status) {
        entity.status = model.status
    }

    if (model.lastMessage) {
        entity.lastMessage = model.lastMessage
    }
}

exports.search = async (query, context, getRead = true) => {

    let where = {}
    let user

    if (query.user) {
        user = await userService.get(query.user, context)
        where.participants = {
            $all: [context.user]

        }
    } else {
        user = context.user
        where.participants = {
            $all: [context.user]
        }
    }

    let sort = {
        timeStamp: -1
    }

    if (query.type) {
        if (where)
            where.type = query.type
        else {
            where = {
                type: query.type
            }
        }
    }

    let items = await db.conversation.find(where).sort(sort).populate('participants owner lastMessage')

    if (getRead) {
        await getUnread(items, user, context)
    }

    return items
}

exports.update = async (query, model, context) => {
    let entity = await exports.get(query, context)
    await set(model, entity, context)
    return entity.save()
}

exports.get = async (query, context, getRead = true, getMessages = true) => {
    if (!query) {
        return
    }

    if (query._bsontype === 'ObjectID') {
        query = {
            id: query.toString()
        }
    }

    let conversation

    if (typeof query === 'string' && query.match(/^[0-9a-fA-F]{24}$/)) {
        conversation = await db.conversation.findById(query).populate('participants owner lastMessage')
    }

    if (query.id) {
        conversation = await db.conversation.findById(query.id).populate('participants owner lastMessage')
    }

    if (getRead) {
        await getUnreadSingle(conversation, context.user, context)
    }

    if (getMessages) {
        conversation.messages = await messageService.search({ conversation: conversation }, context, false)
    }

    return conversation
}

exports.view = async (id, context) => {
    let entities = await messageService.search({ conversation: id, to: context.user }, context)
    for (const entity of entities) {
        for (const to of entity.to) {
            if (to.user.id == context.user.id) {
                to.viewedOn = new Date()
            }
        }
        entity.save()
    }
    return "updated"
}

exports.create = async (model, context) => {
    let users = []
    if (!Array.isArray(model.users)) {
        users = [model.users]
    } else {
        for (const user of model.users) {
            users.push(await userService.get(user, context))
        }
    }

    let type
    if (model.type) {
        type = model.type
    } else {
        type = users.length == 1 ? "direct" : "group"
    }

    users.push(context.user)

    let conversation = new db.conversation({
        type: type,
        participants: users,
        owner: context.user
    })
    await set(model, conversation, context)

    await conversation.save()
    return conversation
}
