document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', (event) => {
        event.preventDefault();
        let usuario = document.getElementById('inputEmail').value;
        let contraseña = document.getElementById('inputPassword').value;

        if (usuario === "" || contraseña === "") {
            alert("Debe iniciar sesión para continuar");
        } else {
            localStorage.setItem("user", usuario); 
            location.href = "index.html";
        }
    });
});

