//require('dotenv').config()

const express = require('express')
const TelegramBot = require('node-telegram-bot-api');
const router = express.Router()
const bot = require('../telegramBot')


//initialize telegram bot


//Sending message
router.post('/',  (req, res) => {
    bot.sendMessage(req.body.userID, req.body.msg)
        .then((response) => {
            res.status(200).json({'response': 'successfully sent message', 'msg': req.body.msg})
        })
        .catch(err => {
            res.status(500).json({'response': 'ERROR', 'msg': err.toString()})
        })
    //res.send(req.body.userID.toString() + "; " + req.body.msg.toString())
})

module.exports = router
