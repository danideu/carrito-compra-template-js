//Creación de carrito compra con OBJETOS.

const carrito = document.querySelector('#carrito')
const template = document.querySelector('#template')
const fragment = document.createDocumentFragment()

//Recogemos todos los botones de la pantalla que tengan clase .card .btn
const botones = document.querySelectorAll('.card .btn')

const carritoObjeto = {}

const agregarAlCarrito = (e) => {
    //El dataset nos hace referencia al data del button, en este caso data-fruit
    console.log(e.target.dataset.fruta)
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1
    }

    if( carritoObjeto.hasOwnProperty(producto.titulo) ){
        producto.cantidad = carritoObjeto[producto.titulo].cantidad + 1
    }
    carritoObjeto[producto.titulo] = producto
    pintarCarrito()
    console.log(carritoObjeto)
}

const pintarCarrito = ( ) => {
    
    carrito.textContent = ""

    Object.values(carritoObjeto).forEach(item => {
        const clone = template.content.firstElementChild.cloneNode(true)
        clone.querySelector('.lead').textContent = item.titulo
        clone.querySelector('.badge').textContent = item.cantidad
        fragment.appendChild(clone)
    })

    carrito.appendChild(fragment)
    
}

//Agregamos una escucha a los botones, para que cuando haga click en alguno de ellos, lance la función agregarAlCarrito()
botones.forEach(btn => btn.addEventListener("click", agregarAlCarrito))