//Arrays
let carrito = []

// Agregando productos al carrito
function addtoCarritoItem(item) {
  const newItem = {
    id: item.id,
    title: item.title,
    precio: item.price,
    img: item.image,
    cantidad: 1,
  }
  addItemCarrito(newItem)
}

function addItemCarrito(newItem) {
  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  if (carrito.length === 0) {
    carrito.push(newItem)
  } else {
    const itemIndex = carrito.findIndex((el) => el.title.trim() == newItem.title.trim());
    itemIndex !== -1 ? (carrito[itemIndex].cantidad++, InputElemnto[itemIndex].value++, CarritoTotal()) : carrito.push(newItem)
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
  renderCarrito()
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
  localStorage.setItem('total', JSON.stringify(Total))
  addLocalStorage()
}

// Eliminando un producto del carrito
function removeItemCarrito(e) {
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for (let i = 0; i < carrito.length; i++) {
    carrito[i].title.trim() === title.trim() && carrito.splice(i, 1);
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
    item.title.trim() === title && (
      sumaInput.value < 1 ? (sumaInput.value = 1) : parseInt(sumaInput.value),
      item.cantidad = parseInt(sumaInput.value),
      Toastify({
        text: "Cantidad Cambiada !",
        duration: 3000,
        gravity: "bottom",
        position: "right",
      }).showToast(),
      renderCarrito(),
      CarritoTotal()
    )
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
  if (carrito.length === 0 ) {
  Swal.fire({
    title: 'Carrito Vacio!',
    text: 'Por favor agregue articulos al carrito !',
    icon: 'error',
    confirmButtonText: 'Aceptar'
  })}
  else {
    window.location.href = '../vistas/pago.html';
  }
}

// Local Storage
function addLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem('carrito'));
  storage && (carrito = storage, renderCarrito())
}
