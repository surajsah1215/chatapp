const chat_area = document.getElementById('chat-area')
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageList = document.getElementById('messagesList')
const createGroupButton = document.getElementById('createGroup')

function showMessages(obj) {
    // messageList.innerText = ''
    // console.log(obj)
    const messageElement = document.createElement('li');
    messageElement.textContent = `${obj.userName} - `+`${obj.text}`
    messageList.appendChild(messageElement).scrollHeight;
  }

  async function fetchAndShowMessages() {
    try {
      const response = await axios.get('http://localhost:3000/allmessages');
      const messages = response.data;
      for (let i = 0; i < messages.length; i++) {
        showMessages(messages[i]);
        localStorage.setItem( messages[i].id,messages[i].text);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


//   setInterval(fetchAndShowMessages, 1000);

  window.addEventListener('DOMContentLoaded', fetchAndShowMessages);


async function messageSent(e){

const token = localStorage.getItem('token')
messageObj={
    mess : messageInput.value
}    
localStorage.setItem('messages', `${messageInput.value}`)
 const response = await axios.post('http://localhost:3000/messageSend',messageObj, {headers:{"authorization":token}})

}

sendButton.addEventListener('click',messageSent)

createGroupButton.addEventListener('click',createNewGroup)

async function createNewGroup(){
  try{
    const groupName = prompt("Enter the name of group:");
    let token = localStorage.getItem('token')
    let response  = await axios.post('http://localhost:3000/groups',{groupName},{headers:{"authorization":token}})
    console.log(response)
    showMessageDiv(response.data.msg);


  }
  catch(error){
    showMessageDiv(error.response.data.msg);
  }
}

function showMessageDiv(text) {
	let head2 = document.createElement("h2");
	head2.innerHTML = text;
	document.querySelector("#messageDiv").appendChild(head2);
	setTimeout(() => {
		document.querySelector("#messageDiv").innerHTML = "";
	}, 3000);
}
