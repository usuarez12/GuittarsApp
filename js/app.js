/*
import { db } from './guitarras.js';

// Iterar arrays
// ciclos
// for(let i = 0; i < db.length; i ++){
//     console.log(db[i].nombre);
// }

const createCard = (name) => {
    const div = document.createElement('div')
    div.className = 'col-md-6 col-lg-4 my-4 row align-items-center'
    div.innerText = name
    return div
}

const container = document.querySelector('main div')


// Métodos de Arrays para Iterar
db.forEach((guitar) => 
    {console.log(guitar.nombre)
    container.appendChild(createCard(guitar.nombre))
});
*/

import { db } from './guitarras.js';

let carrito = []

const divContainer = document.querySelector('main div');
const carritocontainer = document.querySelector('#carrito');


const createCart = (carrito) => {
    console.log(carrito)
    const p = document.createElement('p')
    p.className = 'text-center'
    p.inertertext = 'El carrito está vacío'
    const div = document.createElement('div')
    let total = 0
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
                            <tbody>`
                            carrito.forEach(g =>{
                                total += g.precio * g.cantidad
                                html += `<tr data-id="${ g.id }">
                                    <td>
                                        <img class="img-fluid" src="./img/${ g.imagen }.jpg" alt="imagen guitarra">
                                    </td>
                                    <td>SRV</td>
                                    <td class="fw-bold">
                                            $${ g.precio}
                                    </td>
                                    <td class="flex align-items-start gap-4">
                                        <button
                                            type="button"
                                            class="btn btn-dark"
                                        >-</button>
                                        ${ g.cantidad} 
                                        <button
                                            type="button"
                                            class="btn btn-dark"
                                        >+</button>
                                    </td>
                                    <td>
                                        <button
                                            class="btn btn-danger"
                                            type="button"
                                        >X</button>
                                    </td>
                                </tr>`

                            })
                                
                           html +=  `</tbody>
                        
                        </table>

                        <p class="text-end">Total pagar: <span class="fw-bold">$${total}</span></p>
                        <button class="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>`
    div.innerHTML = html
    if (carrito.length === 0){
        carritocontainer.innerHTML = ''
        carritocontainer.appendChild(p)
    } else {
        carritocontainer.innerHTML = ''
        carritocontainer.appendChild(div)
    }
}
const createCard = (guitar) => {
    const div = document.createElement('div')
    div.className = 'col-md-6 col-lg-4 my-4 row align-items-center'
    const html = ` <div class="col-4">
                    <img class="img-fluid" src="./img/${guitar.imagen}.jpg" alt="imagen guitarra">
                </div>
                <div class="col-8">
                    <h3 class="text-black fs-4 fw-bold text-uppercase">${guitar.nombre}</h3>
                    <p>${guitar.descripcion}</p>
                    <p class="fw-black text-primary fs-3">$${guitar.precio}</p>
                    <button 
                        data-id="${guitar.id}"
                        type="button"
                        class="btn btn-dark w-100 "
                    >Agregar al Carrito</button>
                </div>`
    div.innerHTML = html;
    return div
}

const buttonClicked = (e) => {
    if (e.target.classList.contains('btn')){
        const dataId = e.target.getAttribute('data-id')
        // Verificar si existe guitar en el carrito
        const idCarrito = carrito.findIndex(g => g.id === Number(dataId))
        // Si no, crea un objeto nuevo
        if (idCarrito === -1){
            carrito.push({
                ...db [Number(dataId) - 1],
                cantidad: 1
            })
        } else {
            // Si sí, aumenta la cantidad
            carrito[idCarrito].cantidad++
        }

        /*carrito.push({
            ...db [Number(dataId) - 1],
            cantidad: 1
        })*/
        createCart(carrito)

        
    }
}
const carritoClicked = (e) => {
    if (e.target.classList.contains('btn')){
        const btn = e.target.innerText
        console.log(btn)
        const idCarrito = e.target
            .parentElement
            .parentElement.getAttribute('data-id')
        const idxCarrito =carrito.findIndex(g => g.id === Number(idCarrito))
        if (btn === '-'){
            if(carrito[idxCarrito].cantidad > 1){
                carrito[idxCarrito].cantidad--
            }
        } else if (btn === '+'){
            if (carrito[idxCarrito].cantidad < 10){
                carrito[idxCarrito].cantidad++
            }
        }else if (btn === 'X'){
            carrito = carrito.filter(g => g.id !== Number(idCarrito))
        }else if (btn === 'Vaciar Carrito'.toUpperCase()){
            carrito = []
        }
        createCart(carrito)
    }
}
/*
    const idGuitar = 
    const indexdb= db.findIndex(guitar => guitar.id === Number (idGuitar))
    carrito.push({...db[indexdb], 
        cantidad: 1
    })
    console.log(carrito)
    }
}
*/

/*
const createDiv = (guitar) => {
    const div = document.createElement('div');
    div.className = 'col-md-6 col-lg-4 my-4 row align-items-center'
    const html = `<div class="col-4">
                    <img class="img-fluid" src="./img/${guitar.imagen}.jpg" alt="imagen guitarra">
                </div>
                <div class="col-8">
                    <h3 class="text-black fs-4 fw-bold text-uppercase">${ guitar.nombre }</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit quae labore odit magnam in autem nesciunt, amet deserunt</p>
                    <p class="fw-black text-primary fs-3">$${ guitar.precio}</p>
                    <button 
                        type="button"
                        class="btn btn-dark w-100 "
                    >Agregar al Carrito</button>
                </div>`
    div.innerHTML = html;
    return div;
}
*/

//utilizando interadores
db.forEach( guitar => {
    divContainer.appendChild(createCard(guitar) );
})
createCart(carrito)

divContainer.addEventListener('click', buttonClicked)
carritocontainer.addEventListener('click', carritoClicked)