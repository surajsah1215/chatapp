function login(e){
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    userDetail = {
        email: email.value,
        pass: password.value
    }

    axios.post('http://localhost:3000/login', userDetail)
    .then(response=>{
        if(response.status === 200){
            localStorage.setItem('token', response.data.token)
            alert('login succesful')
        }
       
    }).catch(err=>{
        if(err.code === 'ERR_BAD_REQUEST'){
            alert('user not found')
        }
        else{
        alert('wrong password')
        }
        console.log(err)})
}

const button = document.getElementById('btn')
button.addEventListener('click',login)