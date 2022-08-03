const tbody = document.querySelector('#tbody')
const contenedorProductos = document.getElementById("contenedor-productos");

let carrito = []
let stockProductos = [];

fetch("../js/stock.json")
  .then((resp) => resp.json())
  .then((datos) => {
    datos.forEach((e) => {
      stockProductos.push(e);
      mostrarProductos(stockProductos);
    });
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
                    <button type="button" id="button" class="btn btn-dark">Agregar</button>
                </div>
            </div>
                        `;
    contenedorProductos.appendChild(div);

    const Clickbutton = document.querySelectorAll('#button')
    Clickbutton.forEach(btn => {
      btn.addEventListener('click', addtoCarritoItem)
    })
  })
}

function addtoCarritoItem(e) {
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent
  const itemPrice = item.querySelector('.precio').textContent
  const itemImg = item.querySelector('.card-img-top').src

  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}

function addItemCarrito(newItem) {
  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === newItem.title.trim()) {
      carrito[i].cantidad++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
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
    const Content = `
        <th scope="row">1</th>
        <td class="table__productos">
            <img src=${item.img} alt="">
            <h6 class="title">${item.title}</h6>
        </td>
        <td class="table__precio">${item.precio}</td>
        <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
            <button class="delete btn btn-danger">X</button>
        </td>
        `
    tr.innerHTML = Content;
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
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio * item.cantidad
  })
  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
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