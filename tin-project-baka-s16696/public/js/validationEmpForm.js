function validateForm() {

    const LastnameInput = document.getElementById('lastname');
    const FirstnameInput = document.getElementById('firstname');
    const ExpInput = document.getElementById('exp');
    const LoginInput = document.getElementById('login');
    const PasswordInput = document.getElementById('password');

    const errorLastname = document.getElementById('errorLastName');
    const errorFirstname = document.getElementById('errorFirstName');
    const errorExp = document.getElementById('errorExp');
    const errorLogin = document.getElementById('errorLogin');
    const errorPassword = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('errorsSummary');


    resetErrors([LastnameInput,FirstnameInput,ExpInput,LoginInput,PasswordInput],[errorLastname,errorFirstname,errorExp,errorLogin,errorPassword],errorsSummary);
    let valid = true;

    if (!checkRequired(LastnameInput.value)) {
        valid = false;
        LastnameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(LastnameInput.value, 2, 60)) {
        valid = false;
        LastnameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(FirstnameInput.value)) {
        valid = false;
        FirstnameInput.classList.add("error-input");
        errorFirstname.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(FirstnameInput.value, 2, 60)) {
        valid = false;
        FirstnameInput.classList.add("error-input");
        errorFirstname.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    
    if (!checkRequired(ExpInput.value)) {
        valid = false;
        ExpInput.classList.add("error-input");
        errorExp.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(ExpInput.value, 1,100)) {
        valid = false;
        ExpInput.classList.add("error-input");
        errorExp.innerText ="Pole powinno zawierać do 100 znaków";
    }


    if (!checkRequired(LoginInput.value)) {
        valid = false;
        LoginInput.classList.add("error-input");
        errorLogin.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(LoginInput.value, 3,100)) {
        valid = false;
        LoginInput.classList.add("error-input");
        errorLogin.innerText ="Pole musi mieć minimum 3 znaki";
    } else if (!checkEmail(LoginInput.value)) {
        valid = false;
        LoginInput.classList.add("error-input");
        errorLogin.innerText = "Pole powinno zawierać prawidłowy adres email";
    }


    if (!checkRequired(PasswordInput.value)) {
        valid = false;
        PasswordInput.classList.add("error-input");
        errorPassword.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(PasswordInput.value, 3,100)) {
        valid = false;
        PasswordInput.classList.add("error-input");
        errorPassword.innerText ="Pole musi mieć minimum 3 znaki";
    }


    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;

}

function resetErrors(inputs, errorTexts, errorInfo) {
    for(let i=0; i<inputs.length; i++) {
        inputs[i].classList.remove("error_input");
    }
    for(let i=0; i<errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

