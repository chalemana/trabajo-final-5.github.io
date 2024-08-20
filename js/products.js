const AUTO_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; //la URL de nuestro Json
const container = document.getElementById("container");

/*function productsListAuto101(){
    fetch(AUTO_URL)
    .then(response => response.json())
    .then(productsAuto=> {
        let lista="";
        for(let auto of autos){
            lista+= "<tr><td> <img src='"+ autos.image+"'> </td><td> "+autos.name+ "</td></tr>"
        }
        document.getElementById('productsAuto').innerHTML=lista;
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    productsListAuto101();
}) */
// script.js

async function fetchProducts() {
    try {
        const response = await fetch('https://japceibal.github.io/emercado-api/cats_products/101.json');
        const data = await response.json();
        const table = document.getElementById('productsAuto');

        data.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${product.image}" alt="Imagen del Producto"></td>
                <td>
                    <div class="descripcion"><strong>Nombre:</strong> ${product.name}</div>
                    <div class="descripcion"><strong>Descripción:</strong> ${product.description}</div>
                    <div class="descripcion"><strong>Precio:</strong> ${product.cost + " " + product.currency}</div>
                    <div class="descripcion"><strong>Cantidad de Vendidos:</strong> ${product.soldCount}</div>
                </td>
            `;
            table.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Fetch products when the page loads
window.onload = fetchProducts;

