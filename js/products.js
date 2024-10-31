const container = document.getElementById("container");
let searchInput = document.getElementById('searchInput');
let productList = document.getElementById('productList');
let sortAscBtn = document.getElementById('sortAsc');
let sortDescBtn = document.getElementById('sortDesc');
let buttonFilter = document.getElementById('filtrarBtn');
let buttonClear = document.getElementById('limpiarBtn');
let minBarra = document.getElementById("minPrice");
let maxBarra = document.getElementById("maxPrice");
let relevanteButton = document.getElementById("sortRelevance");

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
    let searchTerm = searchInput.value.toLowerCase();
    return productsArray.filter(product => 
        (product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm))
    );
}

function sortProducts(order) {
  let filteredProducts = filterProducts();
  
    if (order === 'asc') {
        filteredProducts.sort((a, b) => a.cost - b.cost);
    } 
    else if (order === 'desc') {
        filteredProducts.sort((a, b) => b.cost - a.cost);
    } 
    else if (order === 'relevante') {
        filteredProducts.sort((a, b) => b.soldCount - a.soldCount);
    }

    showData(filteredProducts);
}


function filtroPrice() {
        let minPrice = parseFloat(minBarra.value) || 0;
        let maxPrice = parseFloat(maxBarra.value) || Infinity;
        return productsArray.filter(product => 
            product.cost >= minPrice && product.cost <= maxPrice
        );
};


document.addEventListener('DOMContentLoaded', () => {
    const id = localStorage.getItem('catID'); 
    
    if (id) {
        const CAT_URL = "https://japceibal.github.io/emercado-api/cats_products/" + id +".json";
        
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
searchInput.addEventListener('input', () => {
    showData(filterProducts());
});

sortAscBtn.addEventListener('click', () => {
    sortProducts('asc');
});

sortDescBtn.addEventListener('click', () => {
    sortProducts('desc');
});

buttonFilter.addEventListener('click', () => {
    showData(filtroPrice());
});

buttonClear.addEventListener('click', () => {
    minBarra.value = '';
    maxBarra.value = '';
    showData(productsArray);
});

relevanteButton.addEventListener('click', () => {
    sortProducts('relevante');
});
