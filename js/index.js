document.addEventListener("DOMContentLoaded", function() {
    let user = localStorage.getItem("user");

    if (!user) {
        // Si no hay usuario logueado, redirigir a login.html
        window.location = "login.html";
    } else {
        // Configura los eventos para las categorías
        document.getElementById("autos").addEventListener("click", function() {
            localStorage.setItem("catID", 101);
            window.location = "products.html";
        });

        document.getElementById("juguetes").addEventListener("click", function() {
            localStorage.setItem("catID", 102);
            window.location = "products.html";
        });

        document.getElementById("muebles").addEventListener("click", function() {
            localStorage.setItem("catID", 103);
            window.location = "products.html";
        });
    }
});
