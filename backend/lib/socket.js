const {Server}=require('socket.io')
const http=require('http')
const express=require('http')


const app=express

const server=http.createServer(app)





const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
})

export function getReceiverSocketId(userId){
    return userSocketMap(userId)
}

const userSocketMap={}
const userId=sokect.handshake.query.userId

io.on("connection",(socket)=>{
    console.log("A user is connected",socket.id)

const userId=socket.handshake.query.userId
if(userId) userSocketMap[userId]=socket.id
 

    socket.on('disconnect',()=>{
        console.log("A user diconnected",socket.id)
        delete userSocketMap(userId)
        io.emit("getonlineUsers",Object.keys(userSocketMap))
    })
})



moudule.exports={io,app,server}