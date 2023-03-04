//Carrito de compras con delegación de eventos

const carrito = document.querySelector('#carrito')
const template = document.querySelector('#template')
const footer = document.querySelector('#footer')
const templateFooter = document.querySelector('#templateFooter')
const fragment = document.createDocumentFragment()

document.addEventListener('click', (e) => {
    // console.log(e.target.matches(".card .btn-primary"))
    if(e.target.matches(".card .btn-primary")){
        agregarAlCarrito(e)
    }

    // console.log(e.target.matches(".list-group-item .btn-success"))
    if (e.target.matches("#carrito .list-group-item .btn-success")){
        btnAumentar(e)
    }
    if (e.target.matches("#carrito .list-group-item .btn-danger")){
        btnDisminuir(e)
    }
})

let carritoObjeto = []

const agregarAlCarrito = (e) => {
    //El dataset nos hace referencia al data del button, en este caso data-fruit
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio)
    }

    const indice = carritoObjeto.findIndex((item) => item.id === producto.id)

    if (indice === -1){
        carritoObjeto.push(producto)
    } else {
        carritoObjeto[indice].cantidad++
        // carritoObjeto[indice].precio = carritoObjeto[indice].cantidad * producto.precio
    }

    // console.log(carritoObjeto)
    pintarCarrito()
}

const pintarCarrito = () => {
    
    carrito.textContent = ""

    Object.values(carritoObjeto).forEach(item => {
        const clone = template.content.cloneNode(true)
        clone.querySelector('.text-white .lead').textContent = item.titulo
        clone.querySelector('.badge').textContent = item.cantidad
        clone.querySelector('div .lead span').textContent = item.precio * item.cantidad

        clone.querySelector('.btn-danger').dataset.id = item.id
        clone.querySelector('.btn-success').dataset.id = item.id
        fragment.appendChild(clone)
    })

    carrito.appendChild(fragment)

    pintarFooter()
}

const pintarFooter = () => {
    console.log("Pintar footer")
    footer.textContent = ""

    const total = carritoObjeto.reduce(
        (acc, current) => acc + current.cantidad * current.precio, 0
    )
    // console.log(total) 

    const clone = templateFooter.content.cloneNode(true)
    clone.querySelector('span').textContent = total
    if( total > 0 ) footer.appendChild(clone)
}

const btnAumentar = (e) => {
    // console.log("Me diste Agregar", e.target.dataset.id)
    carritoObjeto = carritoObjeto.map(item => {
        if(item.id === e.target.dataset.id){
            item.cantidad++
        }
        return item
    })
    pintarCarrito()
}

const btnDisminuir = (e) => {
    // console.log("Me diste Disminuir", e.target.dataset.id)
    carritoObjeto = carritoObjeto.filter(item => {
        if(item.id === e.target.dataset.id){
            if(item.cantidad > 0){
                item.cantidad--
                if (item.cantidad === 0) return
                return item
            }
        }else { return item}
    })
    pintarCarrito()
}
