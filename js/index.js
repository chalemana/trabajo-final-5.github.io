// Configura los botones de categorías al cargar la página
document.addEventListener("DOMContentLoaded", function(){

    // Guarda el ID de categoría de autos y redirige a la página de productos
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });

    // Guarda el ID de categoría de juguetes y redirige a la página de productos
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });

    // Guarda el ID de categoría de muebles y redirige a la página de productos
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});