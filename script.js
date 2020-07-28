const Password = document.getElementById('Password');
const confirmPassword = document.getElementById('confirmPassword');
const form = document.getElementById('form');
const errorElement = document.getElementById('error');

//form input validation code

form.addEventListener('submit', (e) => {
    let messages = []
    if (fullName.value === '' || fullName.value == null) {
        messages.push('Name is required')
    }

    if (Password == '') {
        messages.push('password is required')
    }
    if(Password != confirmPassword){
        messages.push('password does not match')
    }
    
    if (Password.value.length  >= 6) {
        messages.push('password must be longer than 6 characters')
    } 

    if (Password.value.length  <=20) {
        messages.push('password must be less than 20 characters')
    } 
        
    if(messages.length > 0) {
        e.preventDefault();
        errorElement.innerText = messages.join(', ')
    }
})
