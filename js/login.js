document.addEventListener('DOMContentLoaded', function() {
    let user = localStorage.getItem('user');
    if (user) {
        // Si ya hay usuario logueado, redirigir al index
        window.location = 'index.html';
    } else {
        document.getElementById('submit').addEventListener('click', (event) => {
            event.preventDefault();
            let usuario = document.getElementById('inputEmail').value;
            let contraseña = document.getElementById('inputPassword').value;

            if (usuario === "" || contraseña === "") {
                alert("Debe ingresar usuario y contraseña");
            } else {
                localStorage.setItem("user", usuario);
                location.href = "index.html";
            }
        });
    }
});
