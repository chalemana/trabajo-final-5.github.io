document.addEventListener('DOMContentLoaded', ()=> {
let usuario=localStorage.getItem("user")

if (usuario===null) {
location.href="login.html";
}else{
    document.getElementById('userEmail').innerText=usuario;
}  
});
