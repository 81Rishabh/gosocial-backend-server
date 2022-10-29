class ChatEngine {
    constructor(chatBoxId , userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail) {
            this.connectHandler();
        }
    }

     // initilizing chatHandler 
     connectHandler(){
        let self = this;
        self.socket.on("connect", () => {
            console.log('Connect is established');
        });
           

        // join room
        self.socket.emit('join-room' , {
            userEmail : self.userEmail,
            chatRoom : 'gosocial'
        });
        
        // getting msg from server 
        self.socket.on('user_join' , function(data){
            console.log("user has joined" , data);
        });

      
        // send a message on clicking  the send message
        const inputBox = $('#message-input-box');
        const sendBtn = $('#send-message-btn');
    
        sendBtn.click(function (){
            let msg = inputBox.val();
         
            if(msg != '') {
                self.socket.emit('send-message' , {
                    message : msg,
                    user_email : self.userEmail,
                    chatRoom : 'gosocial'
                });
            }
            inputBox.val("");
        });

         // send message to all the client that are coming form Server
         self.socket.on('recived_message' , function(data){
            let messageType = 'self-message';
            
            if(data.user_email != self.userEmail) {
               messageType = 'other-message';
            }

            const messageBox = $('#chat-body');
            const newMessage = document.createElement('p');
            newMessage.innerHTML = data.message;
            
            if(messageType == 'self-message') {
                newMessage.classList.add('right-message');  
            }
            else {
                newMessage.classList.add('left-message');  
            }

           
            messageBox.append(newMessage);
            messageBox[0].scrollBy({
                top: messageBox[0].scrollHeight,
                behavior: 'smooth'
            });
        });
    }

  
}

