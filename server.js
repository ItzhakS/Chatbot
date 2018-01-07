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

var messages = [
    {name: "Jon", message: "Yo"},
    {name: "Bernard", message: "Hey"}
]

app.get("/messages", (req , res) => {
    res.send(messages)
})

app.post("/messages", (req , res) => {
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on("connection", (socket) => {

})

mongoose.connect(dbUrl,  (err) => {

})

var server = http.listen(3000, () => {
    console.log("Server is listening", server.address().port)
}
)