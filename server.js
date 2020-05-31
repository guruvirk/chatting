var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors')
global.config = process.env.NODE_ENV || "local"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())
app.use((err, req, res, next) => {
    if (err) {
        res.writeHead(500)
        res.end()
        return
    }
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})

var port = process.env.PORT || 8080;
require('./settings/database').configure(process.env.NODE_ENV || "local")

const users = require('./api/users')
const messages = require('./api/messages')
const conversations = require('./api/conversations')
const userValidation = require('./validators/user')

var router = express.Router();

router.route('/users')
    .post(async function (req, res) {
        try {
            let response = await users.create(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    })

router.route('/users/login')
    .post(async function (req, res) {
        try {
            let response = await users.login(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    })

router.route('/users/codeExists/:id')
    .get(async function (req, res) {
        try {
            let response = await users.codeExists(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    })

router.route('/users/phoneExists/:id')
    .get(async function (req, res) {
        try {
            let response = await users.phoneExists(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    })

router.use('/users/logout/:id', userValidation.isValidated);

router.route('/users/logout/:id')
    .get(async function (req, res) {
        try {
            let response = await users.logout(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    })

router.use('/users/:id', userValidation.isValidated);

router.route('/users/:id')
    .put(async function (req, res) {
        try {
            let response = await users.update(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    }).get(async function (req, res) {
        try {
            let response = await users.get(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    })

router.use('/users/changePassword', userValidation.isValidated);

router.route('/users/changePassword')
    .post(async function (req, res) {
        try {
            let response = await users.changePassword(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    })

router.use('/messages/:id', userValidation.isValidated);

router.route('/messages/:id')
    .put(async function (req, res) {
        try {
            let response = await messages.update(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    }).get(async function (req, res) {
        try {
            let response = await messages.get(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    }).delete(async function (req, res) {
        try {
            let response = await messages.remove(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    })

router.use('/messages', userValidation.isValidated);

router.route('/messages')
    .post(async function (req, res) {
        try {
            let response = await messages.create(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    }).get(async function (req, res) {
        try {
            let response = await messages.search(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    })

router.use('/conversations/:id', userValidation.isValidated);

router.route('/conversations/:id')
    .put(async function (req, res) {
        try {
            let response = await conversations.update(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    }).get(async function (req, res) {
        try {
            let response = await conversations.get(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    }).delete(async function (req, res) {
        try {
            let response = await conversations.remove(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    })

router.use('/conversations/:id', userValidation.isValidated);

router.route('/conversations/view/:id')
    .get(async function (req, res) {
        try {
            let response = await conversations.view(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    })

router.use('/conversations', userValidation.isValidated);

router.route('/conversations')
    .post(async function (req, res) {
        try {
            let response = await conversations.create(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    }).get(async function (req, res) {
        try {
            let response = await conversations.search(req)
            res.json({ isSuccess: true, data: response })
        }
        catch (err) {
            res.json({ isSuccess: false, error: err.message })
        }
    })

app.use('/api', router);


app.listen(port);
console.log('Running on port ' + port);