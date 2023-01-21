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











































































