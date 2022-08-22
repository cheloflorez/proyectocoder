// Selectores y Eventos
const contenedorProductos = document.getElementById("contenedor-productos");
const tbody = document.querySelector('#tbody')
document.querySelector("#vaciar").addEventListener('click', vaciarCarrito)
document.querySelector("#comprar").addEventListener('click', comprarCarrito)

//Arrays
let carrito = []
let stockProductos = [];

// Renderizando los productos
const mostrarProductos = async () => {
  const resp = await fetch("../js/stock.json")
  const data = await resp.json()
  data.forEach((producto) => {
    stockProductos.push(producto);
  });
  contenedorProductos.innerHTML = "";
  stockProductos.forEach((item) => {
    let div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML += `
              <div class="card h-100">
                  <img src=${item.image} class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title text-center">${item.title}</h5>
                      <p class="card-text">${item.description}</p>
                  </div>
                  <div class="card-footer text-center">
                      <h5 class="text-primary">Precio : <span class="precio"> ${item.price} </span></h5>
                      <button type="button" id='btn${item.id}' class="btn btn-dark">Agregar</button>
                  </div>
              </div>
                          `;
    contenedorProductos.appendChild(div);
    document.getElementById(`btn${item.id}`).addEventListener("click", function () {
      addtoCarritoItem(item);
    });
  })
}
mostrarProductos()

// Agregando productos al carrito
function addtoCarritoItem(e) {
  const newItem = {
    id: e.id,
    title: e.title,
    precio: e.price,
    img: e.image,
    cantidad: 1,
  }
  addItemCarrito(newItem)
}

function addItemCarrito(newItem) {
  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for (let i = 0; i < carrito.length; i++) {
    carrito[i].title.trim() === newItem.title.trim() ? (carrito[i].cantidad++, InputElemnto[i].value++, CarritoTotal()) : null;
  }
  Toastify({
    text: "Producto Agregado !",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  carrito.push(newItem)
  renderCarrito()
}

// Renderizando Carrito
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
}

// Calculando el total del carrito
function CarritoTotal() {
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = parseInt(item.precio)
    Total = Total + precio * item.cantidad
  })
  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
  renderCarrito2()
}

// Eliminando un producto del carrito
function removeItemCarrito(e) {
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for (let i = 0; i < carrito.length; i++) {
    carrito[i].title.trim() === title.trim() ? carrito.splice(i, 1) : null;
  }
  tr.remove()
  Toastify({
    text: "Producto Eliminado !",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "#DC143C",
    },
  }).showToast();
  CarritoTotal()
}

// Sumando productos ya agregados al carrito
function sumaCantidad(e) {
  const sumaInput = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      Toastify({
        text: "Cantidad Cambiada !",
        duration: 3000,
        gravity: "bottom",
        position: "right",
      }).showToast();
      renderCarrito()
      CarritoTotal()
    }
  })
}

// Vaciar carrito
function vaciarCarrito() {
  Toastify({
    text: "Carrito Vaciado !",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "#DC143C",
    },
  }).showToast();
  carrito = []
  renderCarrito()
}

// Finalizar compra
function comprarCarrito() {
  Swal.fire({
    title: 'Compra Realizada!',
    text: 'Pulsa aceptar para seguir comprando !',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  })
  carrito = []
  renderCarrito()
}

// Local Storage
function addLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem('carrito'));
  storage ? (carrito = storage, renderCarrito()) : null
}
