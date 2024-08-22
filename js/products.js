const AUTO_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

const container = document.getElementById("container");

function showData(productsArray) {
    let Content = '';
    for (const product of productsArray) {
        Content += `
            <tr>
                <td><img src="${product.image}" alt="Imagen del Producto"></td>
                <td>
                    <div class="descripcion"><strong>Nombre:</strong> ${product.name}</div>
                    <div class="descripcion"><strong>Descripción:</strong> ${product.description}</div>
                    <div class="descripcion"><strong>Precio:</strong> ${product.cost + " " + product.currency}</div>
                    <div class="descripcion"><strong>Cantidad de Vendidos:</strong> ${product.soldCount}</div>
                </td>
            </tr>`;
    }
    container.innerHTML = Content;
}

fetch(AUTO_URL)
    .then(response => response.json())
    .then(data => {
        showData(data.products); 
    })
    .catch(error => {
        console.error('Error con fetch', error);
    });
