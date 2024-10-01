
function convertirFecha(newFecha){
    return newFecha.getDate()+ "/" + newFecha.getMonth()+ "/" + newFecha.getFullYear() + ",  " +  newFecha.getHours() + ":" + newFecha.getMinutes()+ ":" + newFecha.getSeconds();
}


document.addEventListener('DOMContentLoaded', () => {
    var productId = localStorage.getItem('selectProductId');

    //Entrega3- mostrar el producto seleccionado con sus detalles e imgs
        fetch("https://japceibal.github.io/emercado-api/products/" + productId + ".json")
            .then(response => response.json())
            .then(data => {
                document.getElementById('productName').innerHTML = data.name;
                document.getElementById('productDescription').innerHTML = data.description;
                document.getElementById('productCategory').innerHTML = data.category;
                document.getElementById('productPrice').innerHTML = data.cost + " " + data.currency
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
            })
            .catch(error => console.error('Error fetching products-info:', error));
    
            document.getElementById('buyButton').addEventListener('click', () => {
                alert('¡Producto añadido al carrito!');
                location.href = 'categories.html';
            });

//Entrega 4 - Parte 2 - mostrar lista de comemtarios ya realizados
            fetch("https://japceibal.github.io/emercado-api/products_comments/" + productId + ".json")
            .then(response => response.json())
            .then(comentarios => {
                let listaComentario = document.getElementById('listaComentario');
                listaComentario.innerHTML = '';
    
                comentarios.forEach(comentario => {
                    
                    let stars = '';

                    for (let i = 0; i < 5; i++) {
                    if (i < comentario.score) {
                    stars += '<i class="fa fa-star checked"></i>';
                    } else {
                    stars += '<i class="fa fa-star"></i>';
                    }}

                    let fecha = comentario.dateTime;
                    let newFecha = new Date (fecha);
                    let nuevaFecha = convertirFecha(newFecha)

                    let comentItem = document.createElement('p');
                    comentItem.innerHTML = `
                        <strong>${comentario.user}</strong> (${nuevaFecha})<br>
                        <em>Calificación:</em> ${stars}<br>
                        <p>${comentario.description}</p>
                    `;
                    listaComentario.appendChild(comentItem);
                });
            })
            .catch(error => console.error('Error comentarios de productos:', error));
    });
            
            
            


//Entrega 4 - Parte 3 y Desafiate - seccion para que el usuario clasifique y luego se agregue a la lista de comentariosya realizados
let  estrellas = document.querySelectorAll('.star');

estrellas.forEach(function(estrella, index){
    estrella.addEventListener('click', function(){

        for (let i=0; i <= index; i++) {
            estrellas[i].classList.add('checked');
        }
        for (let i = index + 1; i < estrellas.length; i++) {
            estrellas[i].classList.remove('checked');
        }
    });
});


document.getElementById('submitClas').addEventListener('click', () => {
    let clasificar = document.querySelectorAll('.star.checked').length;
    let comentario = document.getElementById('comentario').value;
    let usuario = localStorage.getItem('user') || 'usuario ';  

    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < clasificar) {
            stars += '<i class="fa fa-star checked"></i>';
        } else {
            stars += '<i class="fa fa-star"></i>';
        }
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
