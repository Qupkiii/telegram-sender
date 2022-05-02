require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()


mongoose.connect(process.env.DATABESE_URL_MONGO)
    .then((res) => {
        console.log(res)
    })
    .catch((error) => console.log(error.toString()))
const db = mongoose.connection
db.on('error', (error) => console.error(error.toString()))
db.once('open', () => console.log('Connected to DB'))

app.use(express.json())

const telegramRouter = require('./routes/telegram')
app.use('/telegram', telegramRouter)

const plusOneRouter = require('./routes/plusone')
app.use('/plusone', plusOneRouter)

const bot = require('./telegramBot')
const fetch = require("node-fetch");

bot.onText(/(Show\s)?Kitty*/, (msg) => {
    const chatId = msg.chat.id;

    let url = 'https://api.thecatapi.com/v1/images/search'
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            bot.sendMessage(chatId, data[0].url)
                //.then(response => console.log(response))
                //.catch(err => console.error(err))
            console.log(data[0].url)
        })
        .catch((err) => {
            bot.sendMessage(chatId, err.toString())
            //console.log(err.toString())
        })
});

app.listen(process.env.PORT, () => console.log('server started'))