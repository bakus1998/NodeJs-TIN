
function validateForm() {

    const LastnameInput = document.getElementById('lastname');
    const FirstnameInput = document.getElementById('firstname');
    const ExpInput = document.getElementById('exp');

    const errorLastname = document.getElementById('errorLastName');
    const errorFirstname = document.getElementById('errorFirstName');
    const errorExp = document.getElementById('errorExp');
    const errorsSummary = document.getElementById('errorsSummary');


    resetErrors([LastnameInput,FirstnameInput,ExpInput],[errorLastname,errorFirstname,errorExp],errorsSummary);
    let valid = true;

    if (!checkRequired(LastnameInput.value)) {
        valid = false;
        LastnameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(LastnameInput.value, 2, 60)) {
        valid = false;
        LastnameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(FirstnameInput.value)) {
        valid = false;
        FirstnameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(FirstnameInput.value, 2, 60)) {
        valid = false;
        FirstnameInput.classList.add("error-input");
        errorFirstname.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    

   if (checkMaxLength(ExpInput.value, 100)) {
        valid = false;
        ExpInput.classList.add("error-input");
        errorExp.innerText = "Pole powinno zawierać do 100 znaków";
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

