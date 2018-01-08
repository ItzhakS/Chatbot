var express = require("express");
var bodyParser = require("body-parser")
var app = express();
var http = require("http").Server(app)
var io = require("socket.io")(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb://ChatbotAdmin:ChatbotAdmin@ds239177.mlab.com:39177/learning_node'

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

// var messages = [
//     {name: "Jon", message: "Yo"},
//     {name: "Bernard", message: "Hey"}
// ]

app.get("/messages", (req , res) => {
    Message.find({}, (err, messages) =>{
        res.send(messages)
    })
})

app.post("/messages", (req , res) => {
    var message = new Message(req.body)

    message.save((err) =>{
        if(err)
            sendStatus(500)

        messages.push(req.body)
        io.emit('message', req.body)
        res.sendStatus(200)
    })
})

io.on("connection", (socket) => {

})

// mongoose.Promise = global.Promise;
mongoose.connect(dbUrl,  (err) => {
    console.log('Connected')
})

var server = http.listen(3000, () => {
    console.log("Server is listening", server.address().port)
}
)