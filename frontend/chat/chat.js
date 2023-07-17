const chat_area = document.getElementById('chat-area')
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageList = document.getElementById('messagesList')


window.addEventListener("DOMContentLoaded",async()=>{
    const messages = await axios.get('http://localhost:3000/allmessages')
    for(let i=0; i<messages.data.message.length; i++){
        showmessages(messages.data.message[i].message)
    }

})

function showmessages(obj){
    const messageElement = document.createElement('li');
    messageElement.textContent = `${obj}`
    messageList.appendChild(messageElement).scrollHeight;

}


async function messageSent(e){

const token = localStorage.getItem('token')
messageObj={
    mess : messageInput.value
}    
 const response = await axios.post('http://localhost:3000/messageSend',messageObj, {headers:{"authorization":token}})

}

sendButton.addEventListener('click',messageSent)

