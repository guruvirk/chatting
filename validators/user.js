const sessions = require('../services/sessions')
const users = require('../services/user-getter')
var moment = require('moment')

exports.isValidated = async (req, res, next) => {
  console.log('Checking Session Validation');
  if (!req.headers['x-session'] && !req.body['x-session'] && !req.params['x-session']) {
    console.error('Session is Required')
    throw new Error('Session is Required')
  }
  let session = await sessions.get(req.headers['x-session'] || req.body['x-session'] || req.params['x-session'])
  if (!session) {
    console.error('Invalid Session')
    throw new Error('Invalid Session')
  }
  if (!session.user) {
    console.error('Invalid Session')
    throw new Error('Invalid Session')
  }
  if (session.expiry < moment().toDate()) {
    console.error('Invalid Session')
    throw new Error('Invalid Session')
  }
  let user = await users.get(session.user)
  req.context = {
    session: session,
    user: user
  }
  next();
}