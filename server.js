var express = require("express");
var bodyParser = require("body-parser")
var app = express();
var http = require("http").Server(app)
var io = require("socket.io")(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// mongoose.Promise = Promise

var dbUrl = 'mongodb://user:user@ds143907.mlab.com:43907/chatbot'

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

// var messages = []

app.get("/messages", (req , res) => {
    Message.find({}, (err, messages) =>{
        res.send(messages)
    })
})

app.post("/messages", async (req, res) => {
    var message = new Message(req.body)

    var savedMessage = await message.save()

    console.log('saved')

    var censored = await Message.findOne({ message: 'badword' })

    if (censored) 
        await Message.remove({ _id: censored.id })
    else
        io.emit('message', req.body)

    res.sendStatus(200)

        // .catch((err) => {
        //     res.sendStatus(500)
        //     return console.error(err)
        // })

})
//     message.save()
//     .then(() => {
//         console.log('saved')
//         return Message.findOne({ message: 'silly' })
//         })
//     .then(censored => {
//         if (censored) {
//             console.log('Found censored word', censored)
//             return Message.remove({ _id: censored.id })
//         }
//         io.emit('message', req.body)
//         res.sendStatus(200)
//         })
//     .catch((err) => {
//         res.sendStatus(500)
//         return console.error(err)
//         })
//     // messages.push(req.body)

// })

io.on("connection", (socket) => {
    console.log("socket connected")
})

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {useMongoClient: true},  (err) => {
    console.log('Connected')
}).catch((err) => {})

var server = http.listen(3000, () => {
    console.log("Server is listening", server.address().port)
})