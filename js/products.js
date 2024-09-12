const AUTO_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let container = document.getElementById("container");

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
                <td>
                    <button class="btn btn-outline-secondary" onclick="selectProduct(${product.id})">+</button>
                </td>
            </tr>`;
    }
    container.innerHTML = Content;
}

function selectProduct(productId) {
    localStorage.setItem('selectProductId', productId);
    location.href = 'product-info.html';
}

fetch(AUTO_URL)
    .then(response => response.json())
    .then(data => {
        showData(data.products); 
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
