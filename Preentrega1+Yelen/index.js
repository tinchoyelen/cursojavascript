const vinos = [
    {id: 1, nombre: 'Trumpeter', cepa: 'malbec', precio: 1000},
    {id: 2, nombre: 'Alma mora', cepa: 'syrah', precio: 800},
    {id: 3, nombre: 'Luigi bosca', cepa: 'cabernet', precio: 1500},
    {id: 4, nombre: 'Enemgio', cepa: 'malbec', precio: 1200},
    {id: 5, nombre: 'Ruttini', cepa: 'cabernet', precio: 2000},
    {id: 6, nombre: 'Catena Zapata', cepa: 'malbec', precio: 1750},
    {id: 7, nombre: 'Zucardi piedra', cepa: 'malbec', precio: 2000},
    {id: 8, nombre: 'Estiba', cepa: 'malbec', precio: 550},
    {id: 9, nombre: 'Trapiche iscay', cepa: 'syrah', precio: 1550},
    {id: 10, nombre: 'Finca las moras', cepa: 'syrah', precio: 1850},
    {id: 11, nombre: 'Sophenia', cepa: 'syrah', precio: 450},
    {id: 12, nombre: 'Bianchi', cepa: 'cabernet', precio: 1500},
    {id: 13, nombre: 'Primus', cepa: 'cabernet', precio: 400},
];



let mensaje = "Estos son los vinos disponibles para su seleccion:\n";
let resultado = [];
let limite_precio;
let cepa;
comenzar();

function comenzar(){
    cepa = prompt("Seleccione una cepa entre Malbec-Cabernet-Syrah");
    evaluar_cepa(cepa);
}
function evaluar_cepa(cepa){
    switch(cepa.toLowerCase()){
        case "malbec":
        case "cabernet":    
        case "syrah":
                limite_precio = prompt("Seleccione un limite de precio");
                evaluar_precio(limite_precio);
                //console.log(typeof limite_precio)

                for (let i = 0; i < vinos.length; i++) {
                    //console.log(vinos[i]);
                    if (vinos[i].cepa == cepa.toLowerCase() && vinos[i].precio <= parseInt(limite_precio)) {
                        mensaje += vinos[i].nombre + ": $" + vinos[i].precio + "\n";
                        resultado.push(vinos[i]);    
                    }
                }               
                if(resultado.length){
                    alert(mensaje);
                }else{
                    alert("No encontramos ninguna seleccion para ese pedido-Por favor vuelva a comenzar");
                    comenzar();
                }
            break;
        default:
            let nueva_cepa = prompt("Error- Por favor Seleccione una cepa entre Malbec-Cabernet-Syrah");
            evaluar_cepa(nueva_cepa);
            break;
    }
    
}
function evaluar_precio(precio){
    let nuevo_precio;
    if(isNaN(precio)){
        nuevo_precio = prompt("error- Por favor seleccione un valor numerico");
        evaluar_precio(nuevo_precio);
        return; 
    }
   
}







/*let encontrado = vinos.find(item => vinos.nombre === "trumpeter");
let mensaje =
id: ${encontrado.id}
nombre: ${encontrado.nombre} //xq esta en gris
Precio: $${encontrado.precio}
;
console.log(encontrado); //puede ser con un alert tmb?

/////////////////////////////////////////////////7

let filtrados = vinos.filter ((item) => vinos.precio > precio );
filtrados.forEach((item) => {
    let mensaje = `
    id: ${item.id}
    nombre: ${item.nombre}
    precio: $${item.precio}
    `;

    alert(mensaje)
    console.log(filtrados)

});



