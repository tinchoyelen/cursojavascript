const contenedor = document.querySelector('#contenedor')
 fetch('data.json')
.then(response => response.json())
.then(
    (data) => {
let carrito = localStorage.getItem("storageCarrito") ? JSON.parse(localStorage.getItem("storageCarrito")) : []
let iconoCarrito = document.getElementById("carritoContenedor");
let listaCarrito = document.getElementById("listaCarrito")
let totalCarrito = 0;
iconoCarrito.innerHTML=carrito.length;


data.forEach((vinos) => {
    //console.log(vinos);
    const {id, nombre, cepa, precio, img} = vinos
    //console.log(nombre);
    contenedor.innerHTML += `
    <div class="col">
    <div class="card" style="width: 18rem;">
  <img src="imagenes/${img}" class="card-img-top mt-2" alt="imagen de vinos">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">Precio: $${precio}</p>
    <p class="card-text">Cepa: ${cepa}</p>
    
    <button data-id="${id}" class="btn btn-primary agregar">Agregar al carrito</button>
  </div>
</div>
</div>
    `
});

let botones = document.querySelectorAll(".agregar");

//console.log(botones);
botones.forEach((boton) => {
    boton.addEventListener("click",() => {
        const item = data.find((vinos) => vinos.id === parseInt(boton.dataset.id))
        //console.log(item)
        //console.log(boton.dataset.id)
        carrito.push(item);
        //console.log(carrito);

        iconoCarrito.innerHTML= carrito.length;
        localStorage.setItem("storageCarrito", JSON.stringify(carrito))
        

        let timerInterval
            Swal.fire({
                title: 'Producto agregado al carrito',
                timer: 500,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
                })
                    })
});

iconoCarrito.addEventListener("click", () => {
    listaCarrito.innerHTML="";
    carrito.forEach((vino) => {
        //console.log(vinos);
        const { nombre, precio, img, id} = vino
        //console.log(nombre);
        listaCarrito.innerHTML += `
        <li>
      <img class="img-carrito" src="imagenes/${img}" alt="imagen de vinos">
        <p> ${nombre} Precio: $${precio}</p>
        <a class="eliminar" data-id="${id}" data-precio="${precio}"> x </a>
        </li> 
        `
        totalCarrito += parseInt(precio);
    })
    listaCarrito.innerHTML += `<li id="totalLista">Total: $${totalCarrito}</li>`;
    let botonesEliminar= document.querySelectorAll(".eliminar");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const item = carrito.find((vinos) => vinos.id === parseInt(boton.dataset.id));
            const index= carrito.indexOf(item);
            if(index > -1){
                carrito.splice(index, 1);
            }
            totalCarrito -= parseInt(boton.dataset.precio)
            document.getElementById("totalLista").innerHTML = `Total: $${totalCarrito}`;
            localStorage.removeItem("storageCarrito");
            localStorage.setItem("storageCarrito", JSON.stringify(carrito));
            boton.parentElement.remove();
            iconoCarrito.innerHTML=carrito.length;

        })
    })
    

})


let contacto = document.querySelector('#contacto')
contacto.addEventListener('click', () => {
    const { value: email } =  Swal.fire({
  title: 'Escribe su Email y nos contactaremos con vos',
  input: 'email',
  inputPlaceholder: 'Enter your email address'
})

if (email) {
  Swal.fire(`Entered email: ${email}`)
}
})


const procesarCompra = document.querySelector('#procesarCompra')
procesarCompra.addEventListener('click', () => {
    if(carrito.length === 0){
        swal.fire({
            title: "¡Tu carrito esta vacio!",
            text: "Selecciona un vino para seguir con la compra",
            icon: "error",
            confirmButtonText: "Aceptar",
        })

    } else{ 
        const { value: email } = Swal.fire({
            title: 'Gracias por su compra',   
        })
  
        
    }


})

    }
    
  
).catch((error) => {
    console.log(error)
    contenedor.innerHTML="<h2 class='error'> Lo sentimos algo salio mal, intente nuevamente mas tarde. </h2>"
})







































































/*
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
                if (resultado.length) {
                    if (confirm(mensaje + " \n ¿Le interesaría ver nuestras ofertas?" )) {
                        let ofertas = vinos.filter(({oferta}) => oferta);
                        //console.log(ofertas);
                        let resultado_ofertas = "";
                        ofertas.forEach(oferta => {
                            resultado_ofertas += oferta.nombre + " " + oferta.cepa + ": $" + oferta.precio + "\n";
                            
                        });


                        let busqueda = prompt(resultado_ofertas + " \n o sino ingrese el nombre del vino que busca" ); 
                        let vino_buscado = vinos.find(({nombre}) => nombre.toLowerCase() === busqueda.toLowerCase());
                        //console.log(vino_buscado);

                        if (vino_buscado){
                            alert(`Resultado de la busqueda: \n ${vino_buscado.nombre} ${vino_buscado.cepa}: $${vino_buscado.precio} `)
                        } else {
                            alert("Ese vino no esta disponible")
                        }
                    }
                } else {
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
*/






