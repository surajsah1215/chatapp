const chat_area = document.getElementById('chat-area')
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageList = document.getElementById('messagesList')


function showMessages(obj) {
    messageList.innerText = ''
    const messageElement = document.createElement('li');
    messageElement.textContent = `${obj.message}`
    messageList.appendChild(messageElement).scrollHeight;
  }

  async function fetchAndShowMessages() {
    try {
      const response = await axios.get('http://localhost:3000/allmessages');
      const messages = response.data.message;
      
      for (let i = 0; i < messages.length; i++) {
        showMessages(messages[i]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  setInterval(fetchAndShowMessages, 1000);

  window.addEventListener('DOMContentLoaded', fetchAndShowMessages);


async function messageSent(e){

const token = localStorage.getItem('token')
messageObj={
    mess : messageInput.value
}    
 const response = await axios.post('http://localhost:3000/messageSend',messageObj, {headers:{"authorization":token}})

}

sendButton.addEventListener('click',messageSent)

