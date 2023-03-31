const inputDolar = document.getElementById('inputDolar');
const inputDolarBlue = document.getElementById('inputDolarBlue');
const inputDolaresBancos = document.getElementById('inputDolaresBancos');
const inputCriptos = document.getElementById('inputCriptos');
const inputButtonCriptos = document.getElementById('inputButtonCriptos');
const footer = document.getElementById('footer');

const formatMoney = (moneda) => {
    const valorDolar = moneda.toFixed(2);
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(valorDolar);
};
const readData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error en el fetch");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error en la solicitud Fetch", error)
    }
};

inputCriptos.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        let coin = inputCriptos.value;
        try {
            const data = await readData(`https://criptoya.com/api/${coin}/ars/1`)
            showCriptos.innerHTML =
                `
                <div class='brokersCard'>
                    ${Object.entries(data).map(([key, value]) =>
                    `
                        <div class="col-md-6 col-lg-4 ">
                            <div class="card mb-4 shadow-sm brokers">
                                <div class="card-body">
                                    <h3 class="card-title">${key.toUpperCase()}</h3>
                                    <ul class="list-unstyled">
                                        <li>Venta: ${new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value.ask)}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        `).join('')}
                </div>
            `
        } catch (error) {
            await Swal.fire({
                title: "Info",
                text: "La criptomoneda buscada no cotiza dentro de ninguno de los brokers.",
                icon: "info",
                confirmButtonText: "Ok"
            })
        }
    }
})

const valorDolar = async () => {
    try {
        const data = await readData('https://criptoya.com/api/dolar');
        const { oficial, solidario, mep } = data;
        const ordenDolares = [
            { tipo: 'Dolar Oficial', monto: oficial },
            { tipo: 'Dolar Solidario', monto: solidario },
            { tipo: 'Dolar MEP', monto: mep }
        ];
        const divDolares = ordenDolares.map(dolar =>
            `
            <div class="divDolares">
                <h3>${dolar.tipo}</h3>  
                <p>${formatMoney(dolar.monto)}</p>
            </div>
        `).join('');
        inputDolar.innerHTML = `<div class="ordenDolares">${divDolares}</div>`;
    } catch (error) {
        console.log(error);
    }
};

valorDolar();

const valorDolarBlue = async () => {
    const data = await readData('https://criptoya.com/api/dolar');
    const { blue } = data;
    inputDolarBlue.innerHTML =
        `
            <div class="divDolares">
                <h3>Dolar Blue</h3>
                <p>${formatMoney(blue)}</p>
                <h4 id='dD-infoPrecio'>El precio se actualiza minuto a minuto (mientras el mercado esté operando).</h4>
            </div>
        `
}
valorDolarBlue();

const valorBancos = async () => {
    const data = await readData('https://criptoya.com/api/bancostodos');
    const { bapro, bbva, bna, brubank, ciudad, galicia, hipotecario, hsbc, icbc, macro, santander, supervielle } = data;

            inputDolaresBancos.innerHTML =
                `
                    <p>
                        <button class="btn btn-primary btnCotizacionBancos" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Cotización de Bancos
                        </button>
                    </p>
                    <div class="collapse dolarBancos" id="collapseExample">
                        <div class="card card-body">
                            <div class="divDolares">
                                <div class='dD-imgtxt'>
                                    <img src='../../src/assets/imgs/bancoprov.png' class='imgDolares'/>
                                    <h3>Provincia</h3>
                                </div>    
                                <p>Compra ${formatMoney(bapro.bid)}</p>
                                <p>Venta ${formatMoney(bapro.ask)}</p>
                            </div>

                            <div class="divDolares">
                                <div class='dD-imgtxt'>
                                    <img src='../../src/assets/imgs/bancobbva.png' class='imgDolares'/>
                                    <h3>BBVA</h3>
                                </div>
                                <p>Compra ${formatMoney(bbva.bid)}</p>
                                <p>Venta ${formatMoney(bbva.ask)}</p>
                            </div>

                            <div class="divDolares">
                                <div class='dD-imgtxt'>
                                    <img src='../../src/assets/imgs/banconacion.png' class='imgDolares'/>
                                    <h3>Nacion</h3>
                                </div>
                                    <p>Compra ${formatMoney(bna.bid)}</p>
                                    <p>Venta ${formatMoney(bna.ask)}</p>
                            </div>

                            <div class="divDolares">
                                <div class='dD-imgtxt'>
                                    <img src='../../src/assets/imgs/bancociudad.png' class='imgDolares'/>
                                    <h3>Ciudad</h3>
                                </div>
                                    <p>Compra ${formatMoney(ciudad.bid)}</p>
                                    <p>Venta ${formatMoney(ciudad.ask)}</p>
                            </div>

                            <div class="divDolares">
                                <div class='dD-imgtxt'>
                                    <img src='../../src/assets/imgs/bancobrubank.png' class='imgDolares'/>
                                    <h3>Brubank</h3>
                                </div>    
                                    <p>Compra ${formatMoney(brubank.bid)}</p>
                                    <p>Venta ${formatMoney(brubank.ask)}</p>
                            </div>

                            <div class="divDolares">
                                <div class='dD-imgtxt'>
                                    <img src='../../src/assets/imgs/bancogalicia.png' class='imgDolares'/>
                                    <h3>Galicia</h3>
                                </div>
                                    <p>Compra ${formatMoney(galicia.bid)}</p>
                                    <p>Venta ${formatMoney(galicia.ask)}</p>
                            </div>

                            <div class="divDolares">
                                <div class='dD-imgtxt'>
                                    <img src='../../src/assets/imgs/bancohipotecario.png' class='imgDolares'/>
                                    <h3>Hipotecario</h3>
                                </div>
                                    <p>Compra ${formatMoney(hipotecario.bid)}</p>
                                    <p>Venta ${formatMoney(hipotecario.ask)}</p>
                            </div>

                            <div class="divDolares">
                                <div class='dD-imgtxt'>
                                    <img src='../../src/assets/imgs/bancohsbc.png' class='imgDolares'/>
                                    <h3>HSBC</h3>
                                </div>
                                    <p>Compra ${formatMoney(hsbc.bid)}</p>
                                    <p>Venta ${formatMoney(hsbc.ask)}</p>
                            </div>

                            <div class="divDolares">
                                <div class='dD-imgtxt'>
                                    <img src='../../src/assets/imgs/bancoicbc.png' class='imgDolares'/>
                                    <h3>ICBC</h3>
                                </div>
                                    <p>Compra ${formatMoney(icbc.bid)}</p>
                                    <p>Venta ${formatMoney(icbc.ask)}</p>
                            </div>

                            <div class="divDolares">
                                <div class='dD-imgtxt'>
                                    <img src='../../src/assets/imgs/bancomacro.png' class='imgDolares'/>
                                    <h3>Macro</h3>
                                </div>
                                    <p>Compra ${formatMoney(macro.bid)}</p>
                                    <p>Venta ${formatMoney(macro.ask)}</p>
                            </div>

                            <div class="divDolares">
                                <div class='dD-imgtxt'>
                                    <img src='../../src/assets/imgs/bancosantander.png' class='imgDolares'/>
                                    <h3>Santander</h3>
                                </div>
                                    <p>Compra ${formatMoney(santander.bid)}</p>
                                    <p>Venta ${formatMoney(santander.ask)}</p>
                            </div>

                            <div class="divDolares">
                                <div class='dD-imgtxt'>
                                    <img src='../../src/assets/imgs/bancosupervielle.png' class='imgDolares'/>
                                    <h3>Supervielle</h3>
                                </div>
                                    <p>Compra ${formatMoney(supervielle.bid)}</p>
                                    <p>Venta ${formatMoney(supervielle.ask)}</p>
                            </div>
                        </div>
                    </div>
                `

}
valorBancos();

setInterval(() => {
    valorDolar();
    valorBancos();
    valorDolarBlue();
}, 60000);





