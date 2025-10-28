import { db } from './guitarras.js';

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const divContainer = document.getElementById('guitarras-container');
const carritocontainer = document.getElementById('carrito');

const guardarCarrito = () => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

const createCart = (carrito) => {
  carritocontainer.innerHTML = '';
  let total = 0;

  if (carrito.length === 0) {
    const p = document.createElement('p');
    p.className = 'text-center';
    p.innerText = 'El carrito está vacío';
    carritocontainer.appendChild(p);
    return;
  }

  let html = `<table class="w-100 table">
    <thead>
      <tr>
        <th>Imagen</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th></th>
      </tr>
    </thead>
    <tbody>`;

  carrito.forEach((g) => {
    total += g.precio * g.cantidad;
    html += `<tr data-id="${g.id}">
      <td><img class="img-fluid" src="./img/${g.imagen}.jpg" alt="${g.nombre}"></td>
      <td>${g.nombre}</td>
      <td class="fw-bold">$${g.precio}</td>
      <td class="flex align-items-start gap-4">
        <button type="button" class="btn btn-dark">-</button>
        ${g.cantidad}
        <button type="button" class="btn btn-dark">+</button>
      </td>
      <td><button class="btn btn-danger" type="button">X</button></td>
    </tr>`;
  });

  html += `</tbody></table>
    <p class="text-end">Total pagar: <span class="fw-bold">$${total}</span></p>
    <button class="btn btn-dark w-100 mt-3 p-2" id="vaciar">Vaciar Carrito</button>`;

  carritocontainer.innerHTML = html;
};

const createCard = (guitar) => {
  const div = document.createElement('div');
  div.className = 'col-md-6 col-lg-4 my-4 row align-items-center';
  const html = `
    <div class="col-4">
      <img class="img-fluid" src="./img/${guitar.imagen}.jpg" alt="${guitar.nombre}">
    </div>
    <div class="col-8">
      <h3 class="text-black fs-4 fw-bold text-uppercase">${guitar.nombre}</h3>
      <p>${guitar.descripcion}</p>
      <p class="fw-black text-primary fs-3">$${guitar.precio}</p>
      <button data-id="${guitar.id}" type="button" class="btn btn-dark w-100">Agregar al Carrito</button>
    </div>`;
  div.innerHTML = html;
  return div;
};

const buttonClicked = (e) => {
  if (e.target.classList.contains('btn') && e.target.dataset.id) {
    const dataId = Number(e.target.dataset.id);
    const index = carrito.findIndex((g) => g.id === dataId);

    if (index === -1) {
      const producto = db.find((g) => g.id === dataId);
      carrito.push({ ...producto, cantidad: 1 });
    } else {
      carrito[index].cantidad++;
    }

    guardarCarrito();
    createCart(carrito);
  }
};

const carritoClicked = (e) => {
  const btn = e.target.innerText.trim();
  const row = e.target.closest('tr');
  const id = row ? Number(row.dataset.id) : null;
  const index = carrito.findIndex((g) => g.id === id);

  if (btn === '-' && index !== -1) {
    if (carrito[index].cantidad > 1) carrito[index].cantidad--;
  } else if (btn === '+' && index !== -1) {
    carrito[index].cantidad++;
  } else if (btn === 'X' && index !== -1) {
    carrito.splice(index, 1);
  } else if (e.target.id === 'vaciar') {
    carrito = [];
  }

  guardarCarrito();
  createCart(carrito);
};

// Cargar guitarras al inicio
db.forEach((guitar) => divContainer.appendChild(createCard(guitar)));

// Cargar carrito guardado al iniciar
document.addEventListener('DOMContentLoaded', () => createCart(carrito));

divContainer.addEventListener('click', buttonClicked);
carritocontainer.addEventListener('click', carritoClicked);
