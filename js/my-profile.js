document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('profileForm');
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePic = document.getElementById('profilePic');

    // Verifica si el usuario está logueado
    if (!localStorage.getItem('user')) {
        window.location.href = 'login.html';
    }

    // Cargar datos del perfil
    loadProfileData();

    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (form.checkValidity()) {
            saveProfileData();
            alert('Perfil actualizado con éxito');
        } else {
            form.reportValidity();
        }
    });

    // Cambio de foto de perfil
    profilePicInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
                localStorage.setItem('profilePic', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Funciones auxiliares
    function loadProfileData() {
        const profileData = JSON.parse(localStorage.getItem('profileData')) || {};
        for (const [key, value] of Object.entries(profileData)) {
            if (document.getElementById(key)) {
                document.getElementById(key).value = value;
            }
        }
        document.getElementById('nusuario').innerText=localStorage.getItem('userEmail') || 'Usuario';
        document.getElementById('email').value = localStorage.getItem('user') || '';
        profilePic.src = localStorage.getItem('profilePic') || '/api/placeholder/150/150';
    }

    function saveProfileData() {
        const profileData = {
            nombre: document.getElementById('nombre').value,
            segundoNombre: document.getElementById('segundoNombre').value,
            apellido: document.getElementById('apellido').value,
            segundoApellido: document.getElementById('segundoApellido').value,
            telefono: document.getElementById('telefono').value
        };
        localStorage.setItem('profileData', JSON.stringify(profileData));
        localStorage.setItem('user', document.getElementById('email').value);
    }
});
