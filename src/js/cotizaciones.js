const inputDolar = document.getElementById('inputDolar');
const inputDolarBlue = document.getElementById('inputDolarBlue');
const inputCriptos = document.getElementById('inputCriptos');
const searchCriptos = document.getElementById('searchCriptos');
const inputButtonCriptos = document.getElementById('inputButtonCriptos');
const footer = document.getElementById('footer');
const inputValoresDolar = document.querySelectorAll('div.inputValoresDolar');


const formatMoney = (moneda) => {
    const valorDolar = moneda.toFixed(2);
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(valorDolar);
};

const readData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error en el Fetch");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error en la solicitud Fetch", error)
    }
};

searchCriptos.addEventListener('click', async () => {
    let coin = inputCriptos.value;
    try {
        const data = await readData(`https://criptoya.com/api/${coin}/ars/1`);
        showCriptos.innerHTML =
            `
                <div class='brokersCard loan__cotizaciones-criptomonedas_mostrar-ventanas'>
                    ${Object.entries(data)
                .filter(([key, value]) => key !== 'buda')
                .map(([key, value]) => `
                        <div class="col-md-6 col-lg-4 loan__cotizaciones-criptomonedas_mostrar-section">
                            <div class="card-body">
                                <h3 class="card-title">${key.toUpperCase()}</h3>
                                <section> 
                                    <ul class="list-unstyled">
                                        <li>Venta:</li>
                                        <li>${new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(parseInt(value.ask))}</li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                        `).join('')}
                </div>
            `;
    } catch (error) {
        await Swal.fire({
            title: "Info",
            text: "La criptomoneda buscada no cotiza dentro de ninguno de los brokers.",
            icon: "info",
            confirmButtonText: "Ok"
        })
    }

})

const valorDolar = async () => {
    try {
        const data = await readData('https://criptoya.com/api/dolar');
        console.log(data);
        const { oficial, solidario, mep } = data;
        const ordenDolares = [
            { tipo: 'Dolar Oficial', monto: oficial },
            { tipo: 'Dolar Solidario', monto: solidario },
            { tipo: 'Dolar MEP', monto: mep }
        ];
        const divDolares = ordenDolares.map(dolar =>
            `
            <section>
                <h3>${dolar.tipo}</h3>  
                <p>${formatMoney(dolar.monto)}</p>
            </section>
        `).join('');
        inputDolar.innerHTML =
            `
                ${divDolares}
        `;
    } catch (error) {
        console.log(error);
    }
};
valorDolar();

const mostrarDolares = async () => {
    try {
        const data = await readData('https://criptoya.com/api/bancostodos');
        const { bapro, bbva, bna, brubank, ciudad, galicia, hipotecario, hsbc, icbc, macro, santander, supervielle } = data;

        inputValoresDolar.forEach((element) => {
            const bank = element.dataset.bank;
            console.log(bank)
            const price = data[bank];
            element.innerHTML =
                `
                <p>Compra ${formatMoney(price.bid)}</p>
                <p>Venta ${formatMoney(price.ask)}</p>
            `
        })
    } catch (error) {
        console.log(error)
    }
}
mostrarDolares();

const valorDolarBlue = async () => {
    const data = await readData('https://criptoya.com/api/dolar');
    const { blue, blue_bid } = data;
    inputDolarBlue.innerHTML =
        `
                <h3>Dolar Blue</h3>
                <section class="loan__cotizaciones-dolares_blue">
                    <div>
                        <h5>Compra</h5>
                        <p>${formatMoney(blue_bid)}</p>
                    </div>
                    <div>   
                        <h5>Venta</h5>
                        <p>${formatMoney(blue)}</p>
                    </div>
                </section>
                <h4>
                    El precio se actualiza minuto a minuto (mientras el mercado esté operando).
                </h4>
        `
}
valorDolarBlue();


setInterval(() => {
    valorDolar();
    mostrarDolares();
    valorDolarBlue();
}, 60000);





