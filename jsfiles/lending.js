//First Loan Submit. 
    inputSubmit.addEventListener("click", (event) => {
        event.preventDefault()
        if(inputName.value == "" || inputLastName.value == "" || inputAmount.value == "") {
            Swal.fire({
                title: "Error",
                text: "Debes ingresar todos los campos correctamente",
                icon: "error",
                confirmButtonText: "Ok"
            })
        } if(inputAmount.value < 1000 || inputAmount.value > 1000000) {
            Swal.fire({
                titel:"Monto Invalido",
                text:"Solicite un monto valido. Entre $1.000 y $1.000.000",
                icon:"error",
                confirmButtonText: "Ok"
            })
        } else {
            mostrarData()
            addUser()   
            clearInputs()
            console.log(allUsers)
        }
    })

//Erase inputs after submit
    function clearInputs () {
        inputName.value = ""
        inputLastName.value = ""
        inputAmount.value = ""
        inputEmail.value = ""
    }

//Add user data to an [] of {} with a constructor {}
    class Users {
        constructor (name, lastName, email, amount, installments){
        this.name = name,
        this.lastName = lastName,
        this.email = email,
        this.amount = amount,
        this.installments = installments
        }
    }

    function addUser () {
        allUsers.push(new Users (inputName.value, inputLastName.value, inputEmail.value, inputAmount.value, inputCuotas.value))
        localStorage.setItem("Usuario", JSON.stringify(allUsers))
    }

//Show Loan Data an insert it into the DOM
    function mostrarData () {
        if(inputCuotas.value > 12 && inputCuotas.value <= 24){
            interes = 3.4
            meses = 2.4
        }
        
        mostrarResultado.innerHTML = 
        `
        <div>
            <p class = "parrafoResultado">Nombre: ${inputName.value + " " + inputLastName.value}</p>
        </div>
        <div>
            <p class = "parrafoResultado">Ha solicitado un prestamo por: $${inputAmount.value}</p>
        </div>
        <div>
            <p class = "parrafoResultado">A pagar en ${inputCuotas.value} cuotas de $${Math.round((inputAmount.value / inputCuotas.value) * (interes) / meses)}</p>
        </div>
        <div id="botonResultado"> 
            <input type="submit" name="submit" id="submitResultado" value="Solicitar">
        </div>
        `
    }

/* Quizas se pueda implementar con promesas
if(submitResultado){
    submitResultado.addEventListener("click", () => {
        console.log("AAAAAAAAA")
    })
} 

*/

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


