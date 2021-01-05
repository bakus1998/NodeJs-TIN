
function validateForm() {

    const RepairDamage = document.getElementById('damage');
    const RepairDate = document.getElementById('date');
    const RepairPrice = document.getElementById('price');
    const RepairMechanic = document.getElementById('mechanik');
    const RepairPojazd = document.getElementById('pojazd');

    const errorsSummary = document.getElementById('errorsSummary');

    const errorRepairDamage = document.getElementById('errorRepairDamage');
    const errorRepairDate = document.getElementById('errorRepairDate');
    const errorRepairPrice = document.getElementById('errorRepairPrice');
    const errorRepairMechanic = document.getElementById('errorRepairMechanic');
    const errorRepairPojazd = document.getElementById('errorRepairPojazd');


    resetErrors([RepairDamage,RepairDate,RepairPrice,RepairMechanic,RepairPojazd],[errorRepairDamage,errorRepairDate,errorRepairPrice,errorRepairMechanic,errorRepairPojazd],errorsSummary);

    let valid = true;

    if (!checkRequired(RepairDamage.value)) {
        valid = false;
        RepairDamage.classList.add("error-input");
        errorRepairDamage.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(RepairDamage.value, 10, 300)) {
        valid = false;
        RepairDamage.classList.add("error-input");
        errorRepairDamage.innerText = "Pole powinno zawierać od 10 do 300 znaków";
    }

    let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate(),
    year = nowDate.getFullYear();


    if (month.length < 2)
    month = '0' + month;
    if (day.length < 2)
    day = '0' + day;
    const nowString = [year, month, day].join('-');
    
    if (!checkRequired(RepairDate.value)) {
        valid = false;
        RepairDate.classList.add("error-input");
        errorRepairDate.innerText = "Pole jest wymagane";
    } else if (!checkDate(RepairDate.value)) {
        valid = false;
        RepairDate.classList.add("error-input");
        errorRepairDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(RepairDate.value, nowString)) {
        valid = false;
        RepairDate.classList.add("error-input");
        errorRepairDate.innerText = "Data nie może być z przyszłości";
    }

    if (!checkRequired(RepairPrice.value)) {
        valid = false;
        RepairPrice.classList.add("error-input");
        errorRepairPrice.innerText = "Pole jest wymagane";
    }else if(RepairPrice.value<0){
        valid = false;
        RepairPrice.classList.add("error-input");
        errorRepairPrice.innerText = "Podana wartość nie może być ujemna!";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    if (!checkRequired(RepairMechanic.value)) {
        valid = false;
        RepairMechanic.classList.add("error-input");
        errorRepairMechanic.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(RepairPojazd.value)) {
        valid = false;
        RepairPojazd.classList.add("error-input");
        errorRepairPojazd.innerText = "Pole jest wymagane";
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

