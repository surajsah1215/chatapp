async function messageSent(e){
const chat_area = document.getElementById('chat-area')
const messageInput = document.getElementById('message-input');
const token = localStorage.getItem('token')
messageObj={
    mess : messageInput.value
}    
 const response = await axios.post('http://localhost:3000/messageSend',messageObj, {headers:{"authorization":token}})

}

const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click',messageSent)
