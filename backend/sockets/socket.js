module.exports = (io)=>{
    io.on("connection",(socket)=>{   // This function is called whenever a new client connects to the server
        socket.on("message", (msg, userName, groupId) => {
            io.emit("message", msg, userName, groupId);
          });   // Handle custom events from the client
        
        socket.on("file", (msg, userName, groupId) => {
            io.emit("file", msg, userName, groupId);
        });  

    })
}