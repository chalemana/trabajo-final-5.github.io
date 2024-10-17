document.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('user');
    const currentPage = window.location.pathname.split('/').pop();

    if (user) {
        // Si hay usuario logueado, redirigir solo si no es product-info.html
        if (currentPage === 'login.html') {
            window.location.href = 'index.html';
        }
    } else {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                let usuario = document.getElementById('inputEmail').value;
                let contraseña = document.getElementById('inputPassword').value;

                if (usuario === "" || contraseña === "") {
                    alert("Debe ingresar usuario y contraseña");
                } else {
                    localStorage.setItem("user", usuario);
                    window.location.href = "index.html"; // Redirigir al index.html
                }
            });
        }
    }
});