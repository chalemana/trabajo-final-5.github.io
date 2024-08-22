document.addEventListener('DOMContentLoaded', funcion(e){
   
    document.getElementById('submitBtn').addEventListener('click',()=> {
        let usuario =document.getElementById('inputEmail').value;
        let contraseña=document.getElementById('inputPassword').value;
    
        if (usuario===null || contraseña===null){
            alert ("Debe iniciar sesión para continuar");
        }else{
            localStorage.setItem("user", JSON.stringify(usuario:inputEmail.value));
            location.href="index.html";
             } 
    })
    });

document.addEventListener('DOMContentLoaded', ()=> {
let usuario=localStorage.getItem("user")

if (usuario===null) {
location.href="login.html";
}else{
    document.getElementById('userEmail').innerText=usuario;
}  
});
