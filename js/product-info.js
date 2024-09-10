
document.addEventListener('DOMContentLoaded', () => {
    var productId = localStorage.getItem('selectProductId');

    
        fetch("https://japceibal.github.io/emercado-api/products/" + productId + ".json")
            .then(response => response.json())
            .then(data => {
                document.getElementById('productName').innerHTML = data.name;
                document.getElementById('productDescription').innerHTML = data.description;
                document.getElementById('productCategory').innerHTML = data.category;
                document.getElementById('productPrice').innerHTML = data.cost + " " + data.currency
                document.getElementById('soldCount').innerHTML = data.soldCount;

                
                // Configurar la imagen principal y miniaturas
                let imagenPrincipal = document.getElementById('imagenPrincipal');
                let imagenMini = document.getElementById('imagenMini');

                data.images.forEach((imgUrl, index) => {
                    if (index === 0) {
                        imagenPrincipal.src = imgUrl; // La primera imagen es la principal por defecto
                    }

                    let miniaturaImg = document.createElement('img');
                    miniaturaImg.src = imgUrl;
                    miniaturaImg.alt = `Imagen ${index + 1}`;
                    miniaturaImg.addEventListener('click', () => {
                        imagenPrincipal.src = imgUrl; // Cambiar la imagen principal al hacer clic en la miniatura
                    });

                    imagenMini.appendChild(miniaturaImg);
                });
            })
            .catch(error => console.error('Error fetching products-info:', error));
    
});
