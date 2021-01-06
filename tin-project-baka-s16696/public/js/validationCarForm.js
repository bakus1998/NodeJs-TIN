function validateForm() {

    const CarInput = document.getElementById('carName');
    const CarIdr = document.getElementById('idr');
    const CarMileage = document.getElementById('mileage');
    const errorsSummary = document.getElementById('errorsSummary');

    const errorCarInput = document.getElementById('errorCarName');
    const errorCarIdr = document.getElementById('errorCarIdr');
    const errorCarMileage = document.getElementById('errorCarMileage');

    resetErrors([CarInput,CarIdr,CarMileage],[errorCarInput,errorCarIdr,errorCarMileage],errorsSummary);

    let valid = true;

    if (!checkRequired(CarInput.value)) {
        valid = false;
        CarInput.classList.add("error-input");
        errorCarInput.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(CarInput.value, 2, 20)) {
        valid = false;
        CarInput.classList.add("error-input");
        errorCarInput.innerText = "Pole powinno zawierać od 2 do 20 znaków";
    }

    if (!checkRequired(CarIdr.value)) {
        valid = false;
        CarIdr.classList.add("error-input");
        errorCarIdr.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(CarIdr.value, 1, 20)) {
        valid = false;
        CarIdr.classList.add("error-input");
        errorCarIdr.innerText = "Pole powinno zawierać do 10 znaków";
    }

    if (!checkRequired(CarMileage.value)) {
        valid = false;
        CarMileage.classList.add("error-input");
        errorCarMileage.innerText = "Pole jest wymagane";
    } else if (!isItRightMileage(CarMileage.value)) {
        valid = false;
        CarMileage.classList.add("error-input");
        errorCarMileage.innerText = "Przebieg musi mieć poniżej 2.000.000";
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

