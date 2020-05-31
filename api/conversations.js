const service = require('../services/conversations')
const api = require('./api-base')('conversations', 'conversation')

api.view = async (req) => {
    return service.view(req.params.id, req.context)
}

module.exports = api