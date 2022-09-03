// Selectores
const tbody = document.querySelector('#tbody')

// Eventos
document.querySelector("#vaciar").addEventListener('click', vaciarCarrito)
document.querySelector("#comprar").addEventListener('click', comprarCarrito)

// Renderizamos el carrito principal
function renderCarrito() {
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    tr.innerHTML += `
        <th scope="row">${item.id}</th>
        <td class="table__productos">
            <img src=${item.img} alt="">
            <h6 class="title">${item.title}</h6>
        </td>
        <td class="table__precio">${item.precio}</td>
        <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
            <button class="delete btn btn-danger">X</button>
        </td>
        <td class="table__subtotal">${item.precio * item.cantidad}</td>
        `
    tbody.appendChild(tr)
    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
  console.log(carrito)
}
