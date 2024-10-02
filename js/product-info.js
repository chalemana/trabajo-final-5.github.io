
function convertirFecha(newFecha) {
    return newFecha.getDate() + "/" + (newFecha.getMonth() + 1) + "/" + newFecha.getFullYear() + ", " + newFecha.getHours() + ":" + newFecha.getMinutes() + ":" + newFecha.getSeconds();
}

// Redirigir a la página del producto seleccionado
function selectProduct(productId) {
    localStorage.setItem('selectProductId', productId);
    window.location.href = 'product-info.html';  
}

document.addEventListener('DOMContentLoaded', () => {
    var productId = localStorage.getItem('selectProductId');

    // Mostrar el producto seleccionado con sus detalles e imágenes
    fetch("https://japceibal.github.io/emercado-api/products/" + productId + ".json")
        .then(response => response.json())
        .then(data => {
            
            document.getElementById('productName').innerHTML = data.name;
            document.getElementById('productDescription').innerHTML = data.description;
            document.getElementById('productCategory').innerHTML = data.category;
            document.getElementById('productPrice').innerHTML = data.cost + " " + data.currency;
            document.getElementById('soldCount').innerHTML = data.soldCount;

            
            let imagenPrincipal = document.getElementById('imagenPrincipal');
            let imagenMini = document.getElementById('imagenMini');

            data.images.forEach((imgUrl, index) => {
                if (index === 0) {
                    imagenPrincipal.src = imgUrl;
                }

                let miniaturaImg = document.createElement('img');
                miniaturaImg.src = imgUrl;
                miniaturaImg.alt = `Imagen ${index + 1}`;
                miniaturaImg.addEventListener('click', () => {
                    imagenPrincipal.src = imgUrl;
                });

                imagenMini.appendChild(miniaturaImg);
            });

            // Mostrar productos relacionados
            showproduRelacionados(data.relatedProducts);
        })
        .catch(error => console.error('Error al obtener la información del producto:', error));

    // Mostrar los comentarios realizados
    fetch("https://japceibal.github.io/emercado-api/products_comments/" + productId + ".json")
        .then(response => response.json())
        .then(comentarios => {
            let listaComentario = document.getElementById('listaComentario');
            listaComentario.innerHTML = '';

            comentarios.forEach(comentario => {
                let stars = '';
                for (let i = 0; i < 5; i++) {
                    stars += (i < comentario.score) ? '<i class="fa fa-star checked"></i>' : '<i class="fa fa-star"></i>';
                }

                let fecha = new Date(comentario.dateTime);
                let nuevaFecha = convertirFecha(fecha);

                let comentItem = document.createElement('p');
                comentItem.innerHTML = `
                    <strong>${comentario.user}</strong> (${nuevaFecha})<br>
                    <em>Calificación:</em> ${stars}<br>
                    <p>${comentario.description}</p>
                `;
                listaComentario.appendChild(comentItem);
            });
        })
        .catch(error => console.error('Error al obtener los comentarios:', error));

    // botón de compra
    document.getElementById('buyButton').addEventListener('click', () => {
        alert('¡Producto añadido al carrito!');
        location.href = 'categories.html';
    });
});


    // Mostrar productos relacionados
    function showproduRelacionados(produRelacionados) {
        const produRelacionadosContainer = document.getElementById('produRelacionados');
        produRelacionadosContainer.innerHTML = '';  // Limpiar contenido previo
    
        produRelacionados.forEach(produRelated => {
            const produCard = `
                <div class="col-md-3">
                    <div class="card">
                        <img src="${produRelated.image}" class="card-img-top" alt="${produRelated.name}">
                        <div class="card-body">
                            <h5 class="card-title">${produRelated.name}</h5>
                            <button class="btn btn-outline-secondary btn-sm" onclick="selectProduct(${produRelated.id})">Ver Producto</button>
                        </div>
                    </div>
                </div>
            `;
            produRelacionadosContainer.innerHTML += produCard;
        });
    }
    // Función para seleccionar un producto y redirigir
    function selectProduct(productId) {
        localStorage.setItem('selectProductId', productId);
        location.reload(); 
    };

    
// Clasificación por estrellas
let estrellas = document.querySelectorAll('.star');
estrellas.forEach(function(estrella, index) {
    estrella.addEventListener('click', function() {
        for (let i = 0; i <= index; i++) {
            estrellas[i].classList.add('checked');
        }
        for (let i = index + 1; i < estrellas.length; i++) {
            estrellas[i].classList.remove('checked');
        }
    });
});

// Enviar el comentario con clasificación
document.getElementById('submitClas').addEventListener('click', () => {
    let clasificar = document.querySelectorAll('.star.checked').length;
    let comentario = document.getElementById('comentario').value;
    let usuario = localStorage.getItem('user') || 'usuario';

    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += (i < clasificar) ? '<i class="fa fa-star checked"></i>' : '<i class="fa fa-star"></i>';
    }

    let newComentarioHTML = `
        <div class="comentario">
            <strong>${usuario}</strong> (${new Date().toLocaleString()})<br>
            <em>Calificación:</em> ${stars}<br>
            <p>${comentario}</p>
        </div>
    `;

    document.getElementById('listaComentario').insertAdjacentHTML('beforeend', newComentarioHTML);
    document.querySelectorAll('.star.checked').forEach(star => star.classList.remove('checked'));
    document.getElementById('comentario').value = '';
});
