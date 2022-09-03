// Selectores
const contenedorProductos = document.getElementById("contenedor-productos");

//Arrays
let stockProductos = [];

// Renderizamos los productos desde un JSON
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