/* Variables y conexion al DOM */
const contactInputPhone = document.getElementById('contactInputPhone');
const contactInputDni = document.getElementById('contactInputDni');
const contactInputEmail = document.getElementById('contactInputEmail');
const contactFullName = document.getElementById('contactFullName');
const btnSend = document.getElementById('btnSend');

/* Funciones utiles */
const clearData = (data, placeholder) => {
    data.style.border = ".1rem solid red";
    data.value = "";
    data.placeholder = placeholder;
};

const clearContactInputs = () => {
    contactFullName.value = '';
    contactInputEmail.value = '';
    contactInputDni.value = '';
    contactInputPhone.value = '';
};


/* Validacion Nombre y Apellido */
contactFullName.addEventListener('keydown', (e) => {
    if ((/\d/g).test(e.key)) {
        e.preventDefault();
    }
});

contactFullName.addEventListener('change', (e) => {
    let alertaFullName = 'Ingrese su nombre y apellido correctamente.';
    cFname = contactFullName.value;
    if (cFname.length <= 4) {
        clearData(contactFullName, alertaFullName);
    } else {
        contactFullName.style.border = '';
    }
});


/* Validacion DNI */
contactInputDni.addEventListener('change', (e) => {
    let alertaDni = 'Ingrese un DNI correcto (De 6 a 8 numeros).'
    let inputContactDni = Number(contactInputDni.value);
    if (typeof inputContactDni == 'string' || isNaN(inputContactDni)) {
        clearData(contactInputDni, alertaDni);
    } else {
        let iCdniToString = inputContactDni.toString();
        if (iCdniToString.length < '6' || iCdniToString.length > '8') {
            clearData(contactInputDni, alertaDni);
        } else {
            contactInputDni.style.border = '';
        }
    }
});


/* Validacion Email */
contactInputEmail.addEventListener('change', (e) => {
    let alertaEmail = 'Ingrese un Email valido. Debe incluir "@" y ".com" ';
    let inputContactEmail = contactInputEmail.value;
    if (!inputContactEmail.includes('@') && !inputContactEmail.includes('.com')) {
        clearData(contactInputEmail, alertaEmail);
    } else {
        contactInputEmail.style.border = '';
    }
});


/* Validacion Telefono */
contactInputPhone.addEventListener('change', (e) => {
    let alertaPhone = 'Ingrese un telefono valido. ';
    let inputContactPhone = Number(contactInputPhone.value);
    if (typeof inputContactPhone == 'string' || isNaN(inputContactPhone)) {
        clearData(contactInputPhone, alertaPhone);
    } else {
        let stringValue = inputContactPhone.toString();
        // console.log(stringValue.length)
        if (!stringValue.includes('11') || stringValue.length <= 9) {
            clearData(contactInputPhone, alertaPhone);
        } else {
            contactInputPhone.style.border = '';
        }
    }

});


/* Validacion Boton Enviar */
btnSend.addEventListener('click', (e) => {
    e.preventDefault();
    if (contactInputPhone.value == '' || contactInputDni.value == '' || contactInputEmail.value == '' || contactFullName.value == '') {
        Swal.fire({
            title: "Error",
            text: "Debes ingresar todos los campos correctamente.",
            icon: "error",
            confirmButtonText: "Ok"
        });
    } else {
        setTimeout(() => {
            clearContactInputs();
            Swal.fire({
                title: "Informacion",
                text: "Se han enviado los datos correctamente.",
                icon: "success",
                confirmButtonText: "Ok"
            });
        }, 1000);
    }
});
