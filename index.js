//Node server to handle socket io connections
// const io= require('socket.io')(8000)
const io = require('socket.io')(8000, {
    cors: {
      origin: "http://127.0.0.1:5500", // Allow requests from this origin
      methods: ["GET", "POST"]  // Allow only these methods
    }
  });
const users={};
io.on('connection',socket =>{
    socket.on('new-user-joined', uname=>{
        // console.log("new user",uname)
        users[socket.id]=uname;
        socket.broadcast.emit('user-joined',uname);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,uname:users[socket.id]})
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})