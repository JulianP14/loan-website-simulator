
//First Loan Submit. 
    inputSubmit.addEventListener("click", (event) => {
        event.preventDefault()
        if(inputName.value == "" || inputLastName.value == "" || inputAmount.value == "" ||inputDob.value == "" || inputDni.value == "" || inputEmail.value == "" || inputCbu.value == "" || inputPhone.value == "" ) {
            Swal.fire({
                title: "Error",
                text: "Debes ingresar todos los campos correctamente",
                icon: "error",
                confirmButtonText: "Ok"
            })
        } else {
            mostrarData()
            addUser()   
            clearInputs()
            console.log(allUsers)
        }
    })


//Testing inputs via logs

    inputName.addEventListener("change", ()=> {
        let userName = inputName.value
        console.log(userName)
    })
    inputLastName.addEventListener("change", ()=> {
        console.log(inputLastName.value)
    })
    inputAmount.addEventListener("change", ()=> {
        console.log(inputAmount.value)
    })
    inputDni.addEventListener("change", ()=> {
        let dni = inputDni.value
        console.log(dni)
    })
    inputDob.addEventListener("change", ()=> {
        console.log(inputDob.value)
    })
    inputCbu.addEventListener("change", ()=> {
        console.log(inputCbu.value)
    })
    inputEmail.addEventListener("change", ()=> {
        console.log(inputEmail.value)
    })
    inputPhone.addEventListener("change", ()=> {
        console.log(inputPhone.value)
    })

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
    
// Trying to imrpove the functionality from above
    var bankEntity = 
    inputBank.forEach(inputBank => {
        inputBank.addEventListener("click", (e) => {
            e.preventDefault()
                bankEntity = inputBank.innerText
        })
    })

    var employmentStatus =
    inputEmployment.forEach(inputEmployment => {
        inputEmployment.addEventListener("click", (e) => {
            e.preventDefault()
                employmentStatus = inputEmployment.innerText
        })
    })
    

/* function stups(){
    var values = [];
    as.forEach(function(a, index){
    values.push(a.getAttribute("value") || '--- no value ---');
    // OR: values.push(as[index].getAttribute("value"));
    })
    document.getElementById("demo").innerHTML = values.join('<br>');
*/



//Checking and restablishing inputAmount
    inputAmount.addEventListener("blur", () => {
        if(inputAmount.value > 500000){
            inputAmount.value = 500000
        }
        if(inputAmount.value < 1000) {
            inputAmount.value = 1000
        }
    })

//CBU Required Data + Checking variables
    inputCbu.addEventListener("blur", () => {
        let inputCbuNum = Number(inputCbu.value)
            if(typeof inputCbu === "string" || isNaN(inputCbuNum)) {
                inputCbu.style.border = ".1rem solid red"
                inputCbu.value = ""
                inputCbu.placeholder = "Ingrese un CBU correcto"
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
    function clearInputs () {
        inputName.value = ""
        inputLastName.value = ""
        inputDni.value = ""
        inputDob.value = ""
        inputCbu.value = ""
        inputEmail.value = ""
    }

//Add user data to an [] of {} with a constructor {}
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
        }
    }

    function addUser () {
        allUsers.push(new Users (inputName.value, inputLastName.value, employmentStatus, inputDni, inputEmail.value, inputPhone.value, inputAmount.value, inputCbu.value, bankEntity))
        localStorage.setItem("Usuario", JSON.stringify(allUsers))
    }

//Show Loan Data and insert it into the DOM
    function mostrarData (e) {
        if(employmentStatus == undefined || bankEntity == undefined) {
            Swal.fire({
                title: "Datos Faltantes",
                text: "Elija su estado laboral y/o entidad bancaria correctamente",
                icon: "error",
                confirmButtonText: "Ok"
            })
            e.preventDefault()
        } else {
            mostrarResultado.innerHTML = 
            `
            <div>
                <p class = "parrafoResultado">Nombre: ${inputName.value + " " + inputLastName.value}</p>
                <p class = "parrafoResultado">Con DNI: ${inputDni.value}</p>
            </div>
            <div>
                <p class="parrafoResultado">Estado laboral: ${employmentStatus}</p>
            </div>
            <div>
                <p class="parrafoResultado">Entidad Bancaria: ${bankEntity}</p>
                <p class="parrafoResultado">CBU: ${inputCbu.value}</p>
            </div>
            <div>
                <p class = "parrafoResultado">Ha solicitado un prestamo por: $${inputAmount.value}</p>
            </div>
            
            <div id="botonResultado"> 
                <input type="submit" name="submit" id="submitResultado" value="Solicitar">
            </div>
            `
        }
    }

//We get the loans stored in localStorage
    loansSubmit.addEventListener ("click", () => {
        showLoans()
    })

        function showLoans () {
            let mostrar = JSON.parse(localStorage.getItem("Usuario"))
            console.log(mostrar)
        }

// Show the default loans and make it possible to the user to select one and many functions that help the web's display
    function hideButtons1 () { //hide "show default loans" button
        showDefaultLoans.style.display = "none"
        hideDefaultLoans.style.display = "flex"
    }

    function hideButtons2 () { //show "show default loans" button
        hideDefaultLoans.style.display = "none"
        showDefaultLoans.style.display = "flex"
    }
    function hideContent () { //if you click "ocultar" it will show the f() "hideButtons2" and "hideThreeInputs" that will hide the three default loans
        hideDefaultLoans.addEventListener("click", () => {
            showDefaultLoansHTML.innerHTML = ``
            hideButtons2()
            hideThreeInputs()
        })
    }

    function showThreeInputs () {
        threeInputsDiv.style.display = "flex"
    }

    function hideThreeInputs () {
        threeInputsDiv.style.display = "none"
    }

    showDefaultLoans.addEventListener("click", () => {
        hideButtons1()
        showDefaultLoansHTML.innerHTML = 
        `
        <h2>Prestamos preferidos por nuestros clientes </h2>
            <section>
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
            </section>
        `
        hideContent()
        showThreeInputs()
    })

    threeInputs.forEach(threeInputs => {
        threeInputs.addEventListener("click", (/* redirectFunction */) => {
            console.log("prueba")
            /* function redirectFunction () {
                location.href("https://www.tutorialspoint.com/how-to-redirect-to-another-webpage-with-javascript")
            } QUIZAS IMPLEMENTAR REACT PARA EL MOVIMIENTO DE LINKS */
            
        })
    })

    function hideContentHTML () {
        showDefaultLoansHTML.innerHTML = ``
    }
    function showFirstInput () {

    }

    firstInput.addEventListener("click", () => {
        console.log("Hola")
        Swal.fire({
            title: "Confirmacion",
            text:`"Solicita el prestamo de ${defaultLoans[0].amount}?"`,
            icon: "success",
            confirmButtonText: "Dale"
        }).then(setTimeout(() => {
            hideContentHTML()
            hideContent() 
            hideButtons2()
            hideThreeInputs()
        }, 1000)).then(setTimeout(() => {
            firstInput.innerHTML = `
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
            hideContent() 
            hideButtons2()
            hideThreeInputs()
        }, 1000))
    })

    thirdInput.addEventListener("click", () => {
        console.log("Hola")
        Swal.fire({
            title: "Confirmacion",
            text:`"Solicita el prestamo de ${defaultLoans[2].amount}?"`,
            icon: "success",
        }).then(setTimeout(() => {
            hideContentHTML()
            hideContent() 
            hideButtons2()
            hideThreeInputs()
        }, 1000))
    })


