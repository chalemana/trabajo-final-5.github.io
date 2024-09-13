const container = document.getElementById("container");
const searchInput = document.getElementById('searchInput');
const productList = document.getElementById('productList');
/*const sortAscBtn = document.getElementById('sortAsc');
const sortDescBtn = document.getElementById('sortDesc');*/

let productsArray = [];

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

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    return productsArray.filter(product =>
        product.name.toLowerCase().startsWith(searchTerm)
    );
}

/*function sortProducts(order) {
    productsArray.sort((a, b) => {
        if (order === 'asc') {
            return a.cost - b.cost;
        } else if (order === 'desc') {
            return b.cost - a.cost;
        }
    });
    showData(productsArray);
} */

document.addEventListener('DOMContentLoaded', () => {
    const id = localStorage.getItem('catID'); 
    
    if (id) {
        const CAT_URL = `https://japceibal.github.io/emercado-api/cats_products/${id}.json`;
        
        fetch(CAT_URL)
            .then(response => response.json())
            .then(data => {
                productsArray = data.products;
                showData(productsArray);
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    } else {
        console.error('No se encontró un ID de categoría en localStorage');
    }
});

searchInput.addEventListener('input', function () {
    const filteredProducts = filterProducts();
    showData(filteredProducts);
});

/*sortAscBtn.addEventListener('click', function () {
    sortProducts('asc');
});

sortDescBtn.addEventListener('click', function () {
    sortProducts('desc');
});*/
