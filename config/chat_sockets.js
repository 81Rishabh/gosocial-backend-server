const { Server } = require("socket.io");

module.exports.chat_sockets = function(chatServer){
    const io = new Server(chatServer , {
        cors : 'http//locahost:5000'
    });

    io.on('connection', function(socket){
        console.log('connection established', socket.id);

        // reciving the message from the client
        socket.on('join-room' , function(data){
            // joing the room
             socket.join(data.chatRoom);

            // boradcasting the event only those people who have already joined the room
            io.to(data.chatRoom).emit('user_join' , data);
        });
        
        
        socket.on('send-message' , function(data){
            io.in(data.chatRoom).emit('recived_message' , data);
        });
        
        // diconnection acknowladge
        socket.on('disconnect', function(){
            console.log("sokcet disconnected!");
        });
    });
}