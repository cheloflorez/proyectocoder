const tbody = document.querySelector('#tbody')
const contenedorProductos = document.getElementById("contenedor-productos");

let carrito = []
let stockProductos = [];

fetch("../js/stock.json")
  .then((resp) => resp.json())
  .then((datos) => {
    datos.forEach((e) => {
      stockProductos.push(e);     
    });
    mostrarProductos(stockProductos);
  });

function mostrarProductos(array) {
  contenedorProductos.innerHTML = "";
  array.forEach((item) => {
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
    document.getElementById(`btn${item.id}`).addEventListener("click",function(){
      addtoCarritoItem(item);    
  });
  })
}

function addtoCarritoItem(e) {
  const newItem = {
    id : e.id,
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
    if (carrito[i].title.trim() === newItem.title.trim()) {
      carrito[i].cantidad++;
      InputElemnto[i].value++;
      CarritoTotal()
      return null;
    }
  }
  carrito.push(newItem)
  renderCarrito()
}

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

function removeItemCarrito(e) {
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for (let i = 0; i < carrito.length; i++) {

    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1)
    }
  }
  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e) {
  const sumaInput = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      renderCarrito()     
      CarritoTotal()
    }
  })

}

function addLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if (storage) {
    carrito = storage;
    renderCarrito()
  }
}
