// Leemos el carrito y el total desde el LocalStorage
const total = JSON.parse(localStorage.getItem('total'));
const carrito = JSON.parse(localStorage.getItem('carrito'));

// Selectores
const itemCartTotal = document.querySelector('.itemCartTotal')
const nombre = document.querySelector('#firstName')
const apellido = document.querySelector('#lastName')
const direccion = document.querySelector('#direccion')
const telefono = document.querySelector('#phoneNumber')
const metododepago = document.querySelector('#metododepago')

// Eventos
document.querySelector("#finalizar").addEventListener('click', finalizarCompra)

// Renderizamos los articulos y el total
function renderPago() {
  tbodypago.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    tr.innerHTML += `
        <td class="table__productos">
            <img src=${item.img} alt="">
            <h6 class="title">${item.title}</h6>
        </td>
        <td class="table__precio">${item.precio}</td>
        <td class="cantidad">${item.cantidad}</td>
        <td class="table__subtotal">${item.precio * item.cantidad}</td>
        `
    tbodypago.appendChild(tr)
  })
  itemCartTotal.innerHTML = `Total $${total}`
}
renderPago()

// Validamos campos para finalizar la compra
function finalizarCompra() {
  if (nombre.value && apellido.value && direccion.value && telefono.value)
    if (metododepago.value != "Metodo de Pago") {
      Swal.fire({
        title: 'Compra Realizada!',
        text: 'Pulsa aceptar para seguir comprando !',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(function () {
        window.location = "../vistas/menu.html";
        localStorage.clear();
      });
    }
    else {
      Swal.fire({
        title: 'Metodo de pago invalido !',
        text: 'Por favor seleccione un metodo de pago valido !',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  else {
    Swal.fire({
      title: 'Campo Vacio !',
      text: 'Por favor llene todos los campos !',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }
}
