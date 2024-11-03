//crear una funcion para obtener las monedas de la API GEAL//
async function getMonedas (){
    const endpoint =  "https://api.gael.cloud/general/public/monedas"
    const res = await fetch (endpoint)
    const monedas = await res.json ()
    return monedas
}
// crear un objeto  que prepare el objeto de configuracion para la grafica//
function prepararConfiguracionParaLaGrafica (monedas){
    //crear las variables necesarias para el objeto de configuracion/
    const tipoDeGrafica = "line"
    const nombresDeLasMonedas = monedas.map ((moneda)=>moneda.Codigo)
    const titulo = "Monedas"
    const colorDeLinea = "red"
    const valores = monedas.map((moneda)=>{
        const valor = moneda.Valor.replace (",",",")
        return Number (valor)
    })
    //creamos el objeto de configuracion usando las variables anteriores
    const config = {
        type: tipoDeGrafica,
        data:{
            labels:nombresDeLasMonedas,
            datasets:[
                {
                    label:titulo,
                    backgroundColor:colorDeLinea,
                    data:valores
                }
            ]
        }
    }
    return config
}
// En esta función estamos creando todas las variables necesarias para la preparación del  objeto de configuración. En la creación de la variable valores es necesario cambiar las comas(“,”) por puntos (“.”) para  poder ocupar el Number() y parsear el valor que originalmente viene en String.
// Crea y ejecuta una función que renderice la gráfica ocupando las funciones  anteriores

async function renderGrafica() {
    const monedas = await getMonedas()
    const config = prepararConfiguracionParaLaGrafica (monedas)
    const chartDOM = document.getElementById ("myChart")
    new Chart(chartDOM, config)
}


renderGrafica()    