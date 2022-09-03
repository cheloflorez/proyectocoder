// Selectores
const tbody2 = document.querySelector('#tbody2')

// Eventos
document.querySelector("#dropdown01").addEventListener('click', renderCarrito2)

// Renderizamos el carrito del navBar
function renderCarrito2() {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
    tbody2.innerHTML = ''
    storage.map(item => {
      const tr = document.createElement('tr')
      tr.classList.add('ItemCarrito')
      tr.innerHTML += `
      <td class="table__productos">
          <img src=${item.img} alt="">
      </td>
      <td class="table__productos>
      <h6 class="title">${item.title}</h6>
  </td>
  <td class="table__cantidad">
  <h6>${item.cantidad}</h6>
  </td>
      <td class="table__precio">${item.precio * item.cantidad}</td>
          `
      tbody2.appendChild(tr)
    })
  }}