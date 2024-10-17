document.addEventListener('DOMContentLoaded', function() {
    let user = localStorage.getItem('user');
    if (!user) {
        // Si no hay usuario logueado, redirigir a login.html
        window.location = 'login.html';
    } else {
        // Mostrar el usuario logueado en la página
        document.getElementById('usuariologin').textContent = user;
    }
});

