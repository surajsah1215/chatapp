function login(e){
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    userDetail = {
        email: email.value,
        pass: password.value
    }
    console.log(userDetail)

    axios.post('http://localhost:3000/login', userDetail)
    .then(response=>{
        console.log(response.status)
        if(response.status === 200){
            localStorage.setItem('token', response.data.token)
            location.href = "./expense.html"
        }
    }).catch(err=>{console.log(err)})
}

const button = document.getElementById('btn')
button.addEventListener('click',login)