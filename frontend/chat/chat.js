const chat_area = document.getElementById('chat-area')
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageList = document.getElementById('messagesList')
const createGroupButton = document.getElementById('createGroup')

const socket = io("http://localhost:3000");

socket.on("message", (msg, userName, groupId) => {
	if (localStorage.getItem("currentGroupId")) {
		let gId = localStorage.getItem("currentGroupId");
		if (groupId == gId) {
			let newpara = document.createElement("p");
			newpara.innerText = `${userName}: ${msg}`;
			document.querySelector("#chatDiv").appendChild(newpara);
		}
	}
});



function showMessages(obj) {
    // messageList.innerText = ''
    // console.log(obj)
    const messageElement = document.createElement('li');
    messageElement.textContent = `${obj.userName} - `+`${obj.text}`
    messageList.appendChild(messageElement).scrollHeight;
  }

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
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

  window.addEventListener('DOMContentLoaded', (e)=>{
    fetchAndShowMessages()
    // getAllGroups()
    displayGroupsLeft()
  } );


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


async function getAllGroups() {
	try {
		let token = localStorage.getItem("token");
		let response = await axios.get("http://localhost:3000/groups", { headers: { authorization: token } });
    console.log(response.data)
		return response.data;
	} catch (error) {
		console.log(error);
	}
}

async function displayGroupsLeft() {
	try {
		let userId = parseJwt(localStorage.getItem("token")).id;//will get the userId
		let groups = await getAllGroups();
		let ul = document.createElement("ul");
		for (let i = 0; i < groups.length; i++) {
			let li = document.createElement("li");

			li.setAttribute("groupId", groups[i].id);
			li.setAttribute("createdBy", groups[i].createdBy);
			li.textContent = groups[i].groupName;
			if (groups[i].createdBy == userId) {
				let addbutton = document.createElement("button");
				addbutton.textContent = "Add Members";
				addbutton.addEventListener("click", addMembers);

				let delbutton = document.createElement("button");
				delbutton.textContent = "Kick members";
				delbutton.addEventListener("click", kickMembers);

				let promotebutton = document.createElement("button");
				promotebutton.textContent = "change Admin";
				promotebutton.addEventListener("click", changeAdmin);

				let delGroupbutton = document.createElement("button");
				delGroupbutton.textContent = "delete group";
				delGroupbutton.addEventListener("click", deleteGroup);

				li.appendChild(addbutton);
				li.appendChild(delbutton);
				li.appendChild(promotebutton);
				li.appendChild(delGroupbutton);
			}
			let openChatbutton = document.createElement("button");
			openChatbutton.textContent = "open chat";
			// openChatbutton.addEventListener("click", groupChatPage);
			li.appendChild(openChatbutton);
			ul.appendChild(li);
		}

		document.querySelector("#groupsListContainer").innerHTML = "";
		document.querySelector("#groupsListContainer").appendChild(ul);
	} catch (error) {
		console.log(error);
	}
}


async function addMembers(e){
	try{
		let groupid = e.target.parentElement.getAttribute("groupId");
		const memberEmail = prompt("Enter member email")
		if(memberEmail){
			let token = localStorage.getItem("token");
			let res = await axios.post("http://localhost:3000/groups/addmembers", { memberEmail, groupid }, { headers: { authorization: token } });
			showMessageDiv(res.data.msg);
		} else {
			console.log("no member");
		}

	}
	catch(error){
		console.log(error);
		showMessageDiv(error.response.data.msg);
	}
}

async function kickMembers(e) {
	try {
		let groupid = e.target.parentElement.getAttribute("groupId");
		const memberEmail = prompt("Enter mail of person you want to kick out:");

		if (memberEmail) {
			// let token = localStorage.getItem("token");
			let res = await axios.post("http://localhost:3000/groups/kickmembers", { memberEmail, groupid });
			showMessageDiv(res.data.msg);
		} else {
			console.log("no member");
		}
	} catch (error) {
		console.log(error);
		showMessageDiv(error.res.data.msg);
	}
}

async function deleteGroup(e) {
	try {
		e.preventDefault();
		let groupid = e.target.parentElement.getAttribute("groupId");
		let token = localStorage.getItem("token");

		let res = await axios.delete(`http://localhost:3000/groups/deleteGroup/${groupid}`, { headers: { authorization: token } });
		showMessageDiv(res.data.msg);
		displayGroupsLeft();
	} catch (error) {
		console.log(error);
		showMessageDiv(error.response.data.msg);
	}
}

async function changeAdmin(e) {
	try {
		e.preventDefault();
		let groupid = e.target.parentElement.getAttribute("groupId");
		const memberEmail = prompt("Enter mail of person who you want to promote as admin");
		if (memberEmail) {
			let token = localStorage.getItem("token");
			let res = await axios.patch("http://localhost:3000/groups/promoteAdmin", { memberEmail, groupid });
			showMessageDiv(res.data.msg);
			displayGroupsLeft();
		} else {
			console.log("no member");
		}
	} catch (error) {
		console.log(error);
		showMessageDiv(error.response.data.msg);
	}
}