const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//DARK MODE
let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

//Activa el dark mode
function enableDarkMode() {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');

}
//Desactiva el dark mode
function disableDarkMode() {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', null);
}
//Crea la condicion que si el darkmode esta activo active la funcion enableDarkmode()
if(darkmode === "active") enableDarkMode()

  //Crea condicion de cuando debe de activarse y desactivarse los modos
themeSwitch.addEventListener('click', () => {
  darkmode = localStorage.getItem('darkmode');
  
  if (darkmode !== "active") {
    enableDarkMode()
  }
  else {
    disableDarkMode()
  }
});