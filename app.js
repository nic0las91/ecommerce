window.onload = function () {
    const baseDeDatos = [
    
        {
            precio: 140,
            id: 1,
            nombre: "Arroz",
            imagen: 'img/arroz.jpg'
        },
        {
            precio: 75,
            id: 2,
            nombre: "Fideos",
            imagen: 'img/fideos.jpg'
        },
        {
            precio: 135,
            id: 3,
            nombre: "Alfajor",
            imagen: 'img/milka.jfif'
        },
        {
            precio: 140,
            id: 4,
            nombre: "Queso rallado",
            imagen: 'img/queso.jpg'
        },
        {
            precio: 240,
            id: 5,
            nombre: "Budin",
            imagen: 'img/budin.jpeg'
        },
        {
            precio: 370,
            id: 6,
            nombre: "Pan dulce",
            imagen: 'img/pandul.jfif'
        }
        ]
    
        let carrito = [];
        let total = 0;
        
        const DOMitems = document.querySelector('#items');
        const DOMcarrito = document.querySelector('#carrito');
        const DOMtotal = document.querySelector ('#total');
        const DOMbotonVaciar = document.querySelector('#boton-vaciar');
        const miLocalStorage = window.localStorage;
    
    
        function renderizarProductos () {
            baseDeDatos.forEach ((info) =>{
                const menu = document.createElement('div');
                menu.classList.add('card', 'col-sm-4');
    
                const menuCardBody = document.createElement('div');
                menuCardBody.classList.add('card-body', 'd-flex', 'flex-column');
    
                const menuTitulo = document.createElement('h5');
                menuTitulo.classList.add('card-title');
                menuTitulo.textContent = info.nombre;
    
                const menuImagen = document.createElement('img');
                menuImagen.classList.add('img-fluid');
                menuImagen.setAttribute('src', info.imagen);
    
                const menuPrecio = document.createElement ('p');
                menuPrecio.classList.add('card-text');
                menuPrecio.textContent = '$' + info.precio;
    
                const menuBoton = document.createElement('button');
                menuBoton.classList.add('btn', 'btn-primary', 'align-self-center', 'btn-block');
                menuBoton.textContent = 'agregar';
                menuBoton.setAttribute('marcador', info.id);
                menuBoton.addEventListener('click', sumarProductoAlCarrito);
    
                menuCardBody.appendChild(menuImagen);
                menuCardBody.appendChild(menuTitulo);
                menuCardBody.appendChild(menuPrecio);
                menuCardBody.appendChild(menuBoton);
                menu.appendChild(menuCardBody);
                DOMitems.appendChild(menu);
    
    
            });
        }
    
        function sumarProductoAlCarrito(evento) {
            carrito.push(evento.target.getAttribute('marcador'))
    
            calcularTotal();
    
            renderizarCarrito();
            guardarCarritoEnLocalStorage();
        }
    
        function renderizarCarrito() {
            DOMcarrito.textContent = '';
    
            const carritoSinDuplicados = [...new Set(carrito)];
    
            carritoSinDuplicados.forEach((item) => {
                const miItem = baseDeDatos.filter((itemBaseDatos) => {
                    return itemBaseDatos.id === parseInt(item);
                });
                const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                    return itemId === item ? total += 1: total;
                }, 0);
                const menu = document.createElement('li');
                menu.classList.add('list-group-item', 'text-right', 'mx-2');
                menu.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`;
    
    
                const miBoton = document.createElement('button');
                miBoton.classList.add('btn', 'btn-danger', 'mx-5');
                miBoton.textContent = 'X';
                miBoton.style.marginLeft = '1rem';
                miBoton.dataset.item = item;
                miBoton.addEventListener('click', borrarItemCarrito);
    
                menu.appendChild(miBoton);
                DOMcarrito.appendChild(menu);
    
            });
        }
    
    
        function borrarItemCarrito(evento) {
            const id = evento.target.dataset.item;
    
            carrito = carrito.filter((carritoId) => {
                return carritoId !== id;
            });
    
            renderizarCarrito();
            calcularTotal();
            guardarCarritoEnLocalStorage();
        }
    
    
        function calcularTotal(){
            total = 0;
    
        
    
        carrito.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
    
            });
            total = total + miItem[0].precio;
    
        });
        DOMtotal.textContent = total.toFixed(2);
    }
    
    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
        calcularTotal();
        localStorage.clear();
    }

     function guardarCarritoEnLocalStorage () {
                miLocalStorage.setItem('carrito', JSON.stringify(carrito));
            }

    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    
    renderizarProductos();
    cargarCarritoDeLocalStorage();
    calcularTotal();
    renderizarCarrito();
}


    const openEls = document.querySelectorAll("[data-open]");
const isVisible = "is-visible";
 
for(const el of openEls) {
  el.addEventListener("click", function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}






/* AJAX con el form del correo */

const URLGET   = "https://jsonplaceholder.typicode.com/posts"
const infoPost =  { nombre: "  ", proveedor: "  " }
$("#btn1").click(() => { 
    $.post(URLGET, infoPost ,(respuesta, estado) => {
        if(estado === "success"){
            $("body").prepend(`<div>
Guardado:${respuesta.proveedor}
</div>`);
        }  
    });
});





/* Animación JQUERY*/

$("body").prepend('<h3  style="display: none ; text-align: center; color: #ffedbc " >Elegís, comprás y listo!</h3>');
$("h3").slideUp(2000) .slideDown(2000);

$("body").prepend('<h1  style="display: none ; text-align: center; color: #ffedbc " >BIENVENIDO a tu autoservicio</h1>');
$("h1").slideUp(2000) .slideDown(2000);



