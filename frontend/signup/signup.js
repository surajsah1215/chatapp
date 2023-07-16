function postLogin(event){
    event.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById('phone')
    const password = document.getElementById("password");
    userDetail = {
        name:name.value,
        email:email.value,
        phone:phone.value,
        pass:password.value
    }

    axios.post('http://localhost:3000/signup', userDetail)
     .then(response=>{
         if(response.status == 201) location.href="./login.html"
       
     })
     .catch(err=>{
        alert('User already registered')
        })
}

const button = document.getElementById('btn')
button.addEventListener('click',postLogin)
