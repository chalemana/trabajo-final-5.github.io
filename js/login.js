document.addEventListener('DOMContentLoaded', function() {
    let user = localStorage.getItem('user');
    if (user) {
        // Si ya hay usuario logueado, redirigir al index
        window.location = 'index.html';
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
                    // Guardamos el usuario en localStorage para simular una sesión
                    localStorage.setItem("user", usuario);
                    // Redirigimos al index.html
                    window.location.href = "index.html";
                }
            });
        } else {
            document.getElementById('submit').addEventListener('click', (event) => {
                event.preventDefault();
                let usuario = document.getElementById('inputEmail').value;
                let contraseña = document.getElementById('inputPassword').value;

                if (usuario === "" || contraseña === "") {
                    alert("Debe ingresar usuario y contraseña");
                } else {
                    localStorage.setItem("user", usuario);
                    window.location.href = "index.html";
                }
            });
        }
    }
});
