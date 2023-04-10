$(document).ready(function () {
    let today = new Date();
    let maxYear = today.getFullYear() - 18;
    $("#inputDob").datepicker({
        dateFormat: "dd/mm/yy",
        changeYear: true,
        yearRange: "-100:" + maxYear
    });
});

inputSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    const inputs = [inputName, inputLastName, inputAmount, inputDob, inputDni, inputEmail, inputCbu, inputPhone];
    const validarInputs = inputs.every(input => input.value !== "");
    if (validarInputs) {
        mostrarData();
        addUser();
        setTimeout(clearInputs, 1000); //Version mas simple
    } else {
        return Swal.fire({
            title: "Error",
            text: "Debes ingresar todos los campos correctamente",
            icon: "error",
            confirmButtonText: "Ok"
        })
    }
});


// *Trying to improve the functionality from above
let bankEntity = inputBank.forEach(inputBank => {
    inputBank.addEventListener("click", (e) => {
        e.preventDefault();
        const bankE = inputBank.innerText;
        bankEntity == bankE;
        console.log(bankE)
    })
})

let employmentStatus = inputEmployment.forEach(inputEmployment => {
    inputEmployment.addEventListener("click", (e) => {
        e.preventDefault();
        const employStatus = inputEmployment.innerText;
        employmentStatus == employStatus;
        console.log(employStatus)
    })
})

// *Checking and restablishing inputAmount
inputAmount.addEventListener("change", () => {
    if (inputAmount.value > 500000) {
        let valorDef = 500000
        inputAmount.value = valorDef;


    }
    if (inputAmount.value < 1000) {
        let valorDef = 1000
        inputAmount.value = valorDef;
    }
})

//CBU data required + Checking variables (painting the border of red if cbu is string or isNaN, and if the length is below 22 or above 22)
inputCbu.addEventListener("blur", () => {
    let inputCbuNum = Number(inputCbu.value);
    let validarCbu = !isNaN(inputCbuNum) && inputCbuNum.toString().length === 22;
    inputCbu.style.border = validarCbu ? '' : ".1rem solid red"
    inputCbu.value = validarCbu ? inputCbu.value : '';
    inputCbu.placeholder = validarCbu ? '' : 'Ingrese un CBU correcto (22 números)';
})

//Erase inputs after submit 
const clearInputs = () => {
    [
        inputName,
        inputLastName,
        inputDni,
        inputDob,
        inputCbu,
        inputEmail,
        inputPhone
    ].forEach(input => input.value = '');

}

//Add user data to an [] of {} with a constructor {} and store it in localStorage
class Users {
    constructor(name, lastName, employment, dni, email, phone, amount, cbu, bank) {
        this.name = name,
            this.lastName = lastName,
            this.employment = employment,
            this.dni = dni,
            this.email = email,
            this.phone = phone,
            this.amount = amount,
            this.cbu = cbu,
            this.bank = bank
    };
};
const addUser = () => {
    allUsers.push(new Users(inputName.value, inputLastName.value, employmentStatus, inputDni, inputEmail.value, inputPhone.value, inputAmount.value, inputCbu.value, bankEntity))
    localStorage.setItem("Usuario", JSON.stringify(allUsers))
};

//Check the two dropdown buttons and declare the f() that will show us the result in the DOM
const mostrarData = (e) => {
    if (!employmentStatus || !bankEntity) {
        return Swal.fire({
            title: "Datos Faltantes",
            text: "Elija su estado laboral y/o entidad bancaria correctamente",
            icon: "error",
            confirmButtonText: "Ok"
        });
    } else {
        setTimeout(() => {
            Swal.fire({
                title: "Información del Préstamo",
                text: "MESSAGE",
                width: '50%',
                html:
                    `
                        El sr/sra: ${inputName.value} ${inputLastName.value} <br>
                        Con DNI: ${inputDni.value} 
                        <br>
                        Solicita un prestamo por: $${inputAmount.value}
                        <br>
                        A depositar en el ${bankEntity}
                        <br>
                        <br>
                        <h4><strong>¿Desea continuar con el proceso?</strong></h4>
                    `,
                icon: "info",
                button: "Confirmar"
            })
        }, 1000)
    };
};





