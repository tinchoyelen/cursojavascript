const vinos = [
    {nombre: 'Trumpeter', cepa: 'malbec', precio: 1000},
    {nombre: 'Alma mora', cepa: 'syrah', precio: 800},
    {nombre: 'Luigi bosca', cepa: 'cabernet', precio: 1500},
    {nombre: 'Enemgio', cepa: 'malbec', precio: 1200},
    {nombre: 'Ruttini', cepa: 'cabernet', precio: 2000},
    {nombre: 'Elementos', cepa: 'syrah', precio: 750},
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
