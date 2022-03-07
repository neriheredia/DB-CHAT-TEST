//EXPRESS para el server
const express = require('express')
const app = express()

const http = require('http')

const server = http.createServer(app)

//Config
const dotenv = require('dotenv')
const cors = require('cors')
//MONGOOSE para la connection de la DB
const mongoose = require('mongoose')
//ROUTES PARA EL SERVER
const allRoutes = require('./routes/routes')

//CONFIG BASIC
dotenv.config()
app.use(cors())
app.use(express.json())
//CONNECT DATABASE
mongoose.connect(
    process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB is Connect'))
    .catch((err) => console.log(err))

//USE ALL ROUTES
app.use('/api', allRoutes)


//CONFIG SOCKET IO
const io = require('socket.io')(server, {
    cors: {
        origin: "https://front-chat-test.vercel.app/"
    }
})


//SOCKET
let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");

    // take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });

    // console.log("USERS:", users);

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});



//POR ONLINE
server.listen(process.env.PORT || 8300, () => {
    console.log(`Server On Port 8300`);
})