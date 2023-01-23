
/*First Loan Submit. Call several functions:
    . mostrarData() ==> It prints all of the data that the user wrote and input
    . addUser()     ==> Add that data to an [] of {} and store it in the local
        . log(allUsers) ==> Shows all the users in the local
    . clearInputs() ==> After the user submits, all inputs are deleted
*/   

    inputSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        if(inputName.value == "" || inputLastName.value == "" || inputAmount.value == "" ||inputDob.value == "" || inputDni.value == "" || inputEmail.value == "" || inputCbu.value == "" || inputPhone.value == "" ) {
            return Swal.fire({
                title: "Error",
                text: "Debes ingresar todos los campos correctamente",
                icon: "error",
                confirmButtonText: "Ok"
            })
        } else {
            mostrarData();
            addUser();
            console.log(allUsers);  
            setTimeout(() => {
                clearInputs();
            }, 1000);
        };
    });


// This will show us user's employment status as well as his bank
    /* dropDownItems.forEach(dropDownItems => {
        dropDownItems.addEventListener("click", (e) => {
            e.preventDefault()
            let valorA = dropDownItems.innerText
                console.log(valorA)
            let valorB = dropDownItems.innerText
                console.log(valorB)
        })
    }) */
    
// Trying to improve the functionality from above
    let bankEntity
    inputBank.forEach(inputBank => {
        inputBank.addEventListener("click", (e) => {
            e.preventDefault()
                bankEntity = inputBank.innerText
        })
    })

    let employmentStatus 
    inputEmployment.forEach(inputEmployment => {
        inputEmployment.addEventListener("click", (e) => {
            e.preventDefault()
                employmentStatus = inputEmployment.innerText
        })
    })

//Checking and restablishing inputAmount
    inputAmount.addEventListener("change", () => {
        if(inputAmount.value > 500000){
            inputAmount.value = 500000
        }
        if(inputAmount.value < 1000) {
            inputAmount.value = 1000
        }
    })

//CBU data required + Checking variables (painting the border of red if cbu is string or isNaN, and if the length is below 22 or above 22)
    inputCbu.addEventListener("blur", () => {
        let inputCbuNum = Number(inputCbu.value)
            if(typeof inputCbu === "string" || isNaN(inputCbuNum)) {
                inputCbu.style.border = ".1rem solid red"
                inputCbu.value = ""
                inputCbu.placeholder = "Ingrese un CBU correcto (22 numeros)"
            } else {
                let inputCbuNumToStr = inputCbuNum.toString()
                if(inputCbuNumToStr.length <= "21" || inputCbuNumToStr.length >= "23"){
                    inputCbu.style.border = ".1rem solid red"
                    inputCbu.value = ""
                    inputCbu.placeholder = "Ingrese un CBU correcto"
                } else {
                    inputCbu.style.border = ''
                }
            }
    })

//Erase inputs after submit 
    const clearInputs = () => {
        inputName.value = "";
        inputLastName.value = "";
        inputDni.value = "";
        inputDob.value = "";
        inputCbu.value = "";
        inputEmail.value = "";
        inputPhone.value = "";
    }

//Add user data to an [] of {} with a constructor {} and store it in localStorage
    class Users {
        constructor (name, lastName, employment, dni, email, phone, amount, cbu, bank){
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
        allUsers.push(new Users (inputName.value, inputLastName.value, employmentStatus, inputDni, inputEmail.value, inputPhone.value, inputAmount.value, inputCbu.value, bankEntity))
        localStorage.setItem("Usuario", JSON.stringify(allUsers))
    };

//Check the two dropdown buttons and declare the f() that will show us the result in the DOM
    const mostrarData = (e) => {
        if(employmentStatus == undefined || bankEntity == undefined) {
            Swal.fire({
                title: "Datos Faltantes",
                text: "Elija su estado laboral y/o entidad bancaria correctamente",
                icon: "error",
                confirmButtonText: "Ok"
            });
            e.preventDefault();
        } else {
            setTimeout(() => {
                Swal.fire({
                    title: "Titulo",
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
            },1000)
        };
    };

//We get the loans stored in localStorage
    loansSubmit.addEventListener ("click", () => {
        showLoans();
    });
        const showLoans = () => {
            let mostrar = JSON.parse(localStorage.getItem("Usuario"));
            console.log(mostrar);
        };

// Show the default loans and make it possible to the user to select one and many functions that help the web's display. Hides "Show Default Loans" button
    const hideButtons1 = () => {
        showDefaultLoans.style.display = "none";
        hideDefaultLoans.style.display = "flex";
    };
    // Shows "Show Default Loans" button
    const hideButtons2 = () => { 
        hideDefaultLoans.style.display = "none";
        showDefaultLoans.style.display = "flex";
    };
    // If you click "ocultar" it will trigger the f() "hideButtons2" and "hideThreeInputs" that will hide the three default loans
    const hideContent = () => { 
        hideDefaultLoans.addEventListener("click", () => {
            showDefaultLoansHTML.innerHTML = ``;
            hideButtons2();
            hideThreeInputs();
        });
    }
    //Shouws the three default loans buttons
    function showThreeInputs () {
        threeInputsDiv.style.display = "flex";
    };
    //Hides the three default loans buttons
    function hideThreeInputs () {
        threeInputsDiv.style.display = "none";
    };


//Tests the buttons from each default loan
    threeInputs.forEach(threeInputs => {
        threeInputs.addEventListener("click", (/* redirectFunction */) => {
            console.log("prueba")
            /* function redirectFunction () {
                location.href("https://www.tutorialspoint.com/how-to-redirect-to-another-webpage-with-javascript")
            } QUIZAS IMPLEMENTAR REACT PARA EL MOVIMIENTO DE LINKS */
            
        })
    })

//Erases all the content inside showDefaultLoansHTML div
    function hideContentHTML () {
        showDefaultLoansHTML.innerHTML = ``
    }
    function showFirstInput () {

    }


    firstInput.addEventListener("click", () => {
        Swal.fire({
            title: "Confirmacion",
            text:`"Solicita el prestamo de ${defaultLoans[0].amount}?"`,
            icon: "success",
        }).then(setTimeout(() => {
            hideContentHTML()
            hideButtons2()
            hideThreeInputs()
        }, 1000)).then(setTimeout(() => {
            showOneOfThreeButtons.innerHTML = `
                <div>
                    <h3>Prestamo 1</h3>
                        <p>
                            Monto: ${defaultLoans[0].amount}
                        </p>
                        <p>
                            Cuotas: ${defaultLoans[0].installments}
                        </p>
                        <p>
                            Monto x Cuota: ${defaultLoans[0].installmentsValue}
                        </p>
                </div>
            `
        }, 2500))
    })

    secondInput.addEventListener("click", () => {
        console.log("Hola")
        Swal.fire({
            title: "Confirmacion",
            text:`"Solicita el prestamo de ${defaultLoans[1].amount}?"`,
            icon: "success",
        }).then(setTimeout(() => {
            hideContentHTML()
            hideButtons2()
            hideThreeInputs()
        }, 1000)).then(setTimeout(() => {
            showOneOfThreeButtons.innerHTML = `
            <div>
                    <h3>Prestamo 1</h3>
                        <p>
                            Monto: ${defaultLoans[1].amount}
                        </p>
                        <p>
                            Cuotas: ${defaultLoans[1].installments}
                        </p>
                        <p>
                            Monto x Cuota: ${defaultLoans[1].installmentsValue}
                        </p>
                </div>
            `
        }, 2500))
    })

    thirdInput.addEventListener("click", () => {
        console.log("Hola")
        Swal.fire({
            title: "Confirmacion",
            text:`"Solicita el prestamo de ${defaultLoans[2].amount}?"`,
            icon: "success",
        }).then(setTimeout(() => {
            hideContentHTML()
            hideButtons2()
            hideThreeInputs()
        }, 1000)).then(setTimeout(() => {
            showOneOfThreeButtons.innerHTML = `
            <div>
                    <h3>Prestamo 1</h3>
                        <p>
                            Monto: ${defaultLoans[2].amount}
                        </p>
                        <p>
                            Cuotas: ${defaultLoans[2].installments}
                        </p>
                        <p>
                            Monto x Cuota: ${defaultLoans[2].installmentsValue}
                        </p>
                </div>
            `
        }, 2500))
    })


