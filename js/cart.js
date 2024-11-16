// Al cargar el documento, se obtiene el carrito de localStorage y se muestran los productos
document.addEventListener('DOMContentLoaded', () => {
    let productoEnCarrito = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];
    showCartProducts(productoEnCarrito);

    // Asignar funciones a los botones de vaciar, finalizar compra y aplicar descuento
    document.getElementById('boton-vaciar-carrito').addEventListener('click', vaciarCarrito);
    document.getElementById('boton-finalizar-compra').addEventListener('click', finalizarCompra);
    document.getElementById('applyDiscount').addEventListener('click', aplicarDescuento);
});

// Variable para rastrear si se aplicó un descuento
let descuentoAplicado = false;

//calcular costo de envio y segun el tipo
function calcularCostoEnvio(tipoEnvio, subtotalCarrito) {
    let tasas = {
        'premium': 0.15,
        'express': 0.07,
        'standard': 0.05
    };
    // Obtener la tasa según el tipo de envío
    let tasaEnvio = tasas[tipoEnvio] || 0; 

    // Calcular y devolver el costo de envío
    return subtotalCarrito * tasaEnvio;
}

// Muestra los productos en el carrito y actualiza subtotales y totales
function showCartProducts(productoEnCarrito) {
    let CartProductsContainer = document.getElementById('selectProductId');
    let cartSubtotal = document.getElementById('subtotalCarrito');
    let cartEnvio = document.getElementById('envioCarrito');
    let cartTotal = document.getElementById('totalCarrito');
    let cartDiscount = document.getElementById('cartDiscount');
    
    let subtotalGeneral = 0;

    CartProductsContainer.innerHTML = ''; // Limpia el contenedor

    // Si el carrito está vacío, muestra un mensaje
    if (productoEnCarrito.length === 0) {
        CartProductsContainer.innerHTML = '<tr><td colspan="7">El carrito está vacío.</td></tr>';
        cartSubtotal.innerText = '0';
        cartEnvio.innerText = '0';
        cartTotal.innerText = '0';
        actualizarBadgeCarrito(0);
        return;
    }

    // Convierte de USD a UYU si es necesario y lo suma al total general
    productoEnCarrito.forEach((product, index) => {
        let productCost = product.currency === 'USD' ? product.cost * 40 : product.cost; 
        let subtotal = productCost * product.cantidad; 
        subtotalGeneral += subtotal; 

        // Crea una fila para el producto
        let row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: auto;"></td>
            <td>${product.name}</td>
            <td>${product.currency === 'USD' ? 'UYU' : product.currency}</td>
            <td>${productCost}</td>
            <td>
                <input type="number" value="${product.cantidad}" style="width: 50px; text-align: center;" 
                    onchange="updateQuantityDirect(${index}, this.value)" />
            </td>
            <td id="subtotal-${index}">${subtotal}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button></td>
        `;
        CartProductsContainer.appendChild(row); // Agrega la fila al contenedor

    });

    // Actualiza subtotal general
    cartSubtotal.innerText = subtotalGeneral;

    // Actualiza el costo de envío en base a la selección
    let tipoEnvio = document.getElementById('tipoEnvioSelect').value;
    let costoEnvio = calcularCostoEnvio(tipoEnvio, subtotalGeneral);
    cartEnvio.innerText = costoEnvio.toFixed(1);

    // Calcula el total con el costo de envío
    let total = subtotalGeneral + costoEnvio;

    // Aplica descuento si corresponde
    if (descuentoAplicado) {
        let descuentoSumado = total * 0.25; // 25% de descuento
        cartDiscount.innerText = `- ${descuentoSumado}`;
        total -= descuentoSumado; 
    } else {
        cartDiscount.innerText = '0';
    }

    cartTotal.innerText = total; // Muestra el total
    actualizarBadgeCarrito(productoEnCarrito.length); // Actualiza el badge del carrito
}

// Aplica el descuento basado en el código ingresado
function aplicarDescuento() {
    let descuentoCode = document.getElementById('discountCode').value;
    
    if (descuentoCode === "FERNANDITOS" && !descuentoAplicado) {
        descuentoAplicado = true; // descuento como aplicado
        alert("¡Descuento del 25% aplicado!");
        showCartProducts(JSON.parse(localStorage.getItem("productoEnCarrito"))); 
    } else if (descuentoAplicado) {
        alert("El descuento ya ha sido aplicado."); 
    } else {
        alert("Código de descuento inválido."); 
    }
}

// Vacia el carrito y actualiza la vista
function vaciarCarrito() {
    localStorage.removeItem("productoEnCarrito"); 
    showCartProducts([]); 
    alert("El carrito ha sido vaciado.");
}

// Finaliza la compra redirigiendo a PayPal
function finalizarCompra() {
    let cartTotal = document.getElementById('totalCarrito').textContent; 
    let paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=tuemail@tuempresa.com&currency_code=USD&amount=${cartTotal}&item_name=Compra%20en%20tu%20sitio`;
    //window.location.href = paypalUrl; // Redirige a PayPal
}

// Actualiza la cantidad de un producto en el carrito
function updateQuantity(index, change) {
    let productoEnCarrito = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];

    // la cantidad no baje de 1 y muestra el carrito actualizado
    if (productoEnCarrito[index].cantidad + change >= 1) {
        productoEnCarrito[index].cantidad += change; 
        localStorage.setItem("productoEnCarrito", JSON.stringify(productoEnCarrito)); 
        showCartProducts(productoEnCarrito); 
    }
}
// Actualiza la cantidad directamente desde el input
function updateQuantityDirect(index, value) {
    let productoEnCarrito = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];
    productoEnCarrito[index].cantidad = parseInt(value) || 1; 
    localStorage.setItem("productoEnCarrito", JSON.stringify(productoEnCarrito)); 
    showCartProducts(productoEnCarrito); 
}

// Elimina un producto del carrito
function removeFromCart(index) {
    let productoEnCarrito = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];
    productoEnCarrito.splice(index, 1); 
    localStorage.setItem("productoEnCarrito", JSON.stringify(productoEnCarrito)); 
    showCartProducts(productoEnCarrito);
}

// Actualiza el badge del carrito con el total de productos y el total general $
function actualizarBadgeCarrito(totalItems) {
    document.getElementById("cart-badge").textContent = `${totalItems} - $${document.getElementById('totalCarrito').innerText}`;
}


// Función para actualizar el costo de envío basado en la selección del tipo de envío
document.getElementById('tipoEnvioSelect').addEventListener('change', function () {
    let tipoEnvio = this.value;
    let subtotalCarrito = parseFloat(document.getElementById('subtotalCarrito').innerText);
    let costoEnvio = calcularCostoEnvio(tipoEnvio, subtotalCarrito);
    document.getElementById('envioCarrito').innerText = costoEnvio.toFixed(1);

    // Actualizar el total
    let total = subtotalCarrito + costoEnvio;
    document.getElementById('totalCarrito').innerText = total.toFixed(1);
});


//Forma de pago con los campos para PayPal, tarjeta de credito y transferencia bancaria
document.getElementById('formaPago').addEventListener('change', function () {
const camposAdicionales = document.getElementById('camposAdicionales');
camposAdicionales.innerHTML = '';
  
 switch (this.value) {
 case 'tarjeta':
    camposAdicionales.innerHTML = `
          <label for="numeroTarjeta">Número de tarjeta:</label>
          <input type="text" id="numeroTarjeta" class="form-control" placeholder="Ingrese el número de tarjeta">
          <label for="fechaVencimiento">Fecha de vencimiento:</label>
          <input type="month" id="fechaVencimiento" class="form-control">
          <label for="cvv">CVV:</label>
          <input type="text" id="cvv" class="form-control" placeholder="Ingrese el CVV">
        `;
    camposAdicionales.style.display = 'block';
        break;
        case 'transferencia':
    camposAdicionales.innerHTML = `
          <label for="cuentaBancaria">Número de cuenta bancaria:</label>
          <input type="text" id="cuentaBancaria" class="form-control" placeholder="Ingrese el número de cuenta">
        `;
    camposAdicionales.style.display = 'block';
        break;
        case 'paypal':
            camposAdicionales.innerHTML = `
              <label for="correoPaypal">Correo de PayPal:</label>
              <input type="email" id="correoPaypal" class="form-control" placeholder="Ingrese su correo de PayPal">
              <div style="margin-top: 10px;">
              <a href="https://www.paypal.com/signin" target="_blank" class="btn btn-primary">Ir a PayPal</a>
              </div>
            `;
        break;
        
       
    camposAdicionales.style.display = 'block';
       break;
       default:
    camposAdicionales.style.display = 'none';
    }
  });
  
// Boton finalizar compra 
let botonFinalizarCompra = document.getElementById("boton-finalizar-compra");
botonFinalizarCompra.addEventListener('click', () => {  

// direccion 
let departamento = document.getElementById('departamento').value.trim();
let localidad = document.getElementById('localidad').value.trim();
let calle = document.getElementById('calle').value.trim();
let numero = document.getElementById('numero').value.trim();
let esquina = document.getElementById('esquina').value.trim();

//forma de envio 
let formaDeEnvio = document.getElementById("tipoEnvioSelect").value;

//forma de pago 
let formaDePago = document.getElementById("formaPago").value;

let existenProductos = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];

if (existenProductos.length === 0) {
    Swal.fire({
        icon: 'warning',
        title: 'Carrito vacío',
        text: 'No puedes finalizar la compra sin productos en el carrito.',
    });
    return;
}

if (!departamento || !localidad || !calle || !numero || !esquina) {
    Swal.fire({
        icon: 'warning',
        title: 'No rellenaste todos los campos de tu dirección',
        text: 'Por favor, rellene los campos vacíos',
    });
    return;
}

if (!formaDeEnvio) {
    Swal.fire({
        icon: 'warning',
        title: 'Tipo de envío no seleccionado',
        text: 'Por favor, selecciona un tipo de envío.',
    });
    return;
}

let pago = document.getElementById('formaPago').value;

if (!formaDePago) {
    Swal.fire({
        icon: 'warning',
        title: 'Forma de pago no seleccionada',
        text: 'Por favor, selecciona una forma de pago.',
    });
    return;
}


if (formaDePago === 'tarjeta') {
    let numeroTarjeta = document.getElementById('numeroTarjeta')?.value;
    let fechaVencimiento = document.getElementById('fechaVencimiento')?.value;
    let cvv = document.getElementById('cvv')?.value;

    if (!numeroTarjeta || !fechaVencimiento || !cvv) {
        Swal.fire({
            icon: 'warning',
            title: 'Datos de tarjeta incompletos',
            text: 'Por favor, rellena todos los campos de tu tarjeta de credito.'
        });
        return;
    }
} else if (formaDePago === 'transferencia') {
    let cuentaBancaria = document.getElementById('cuentaBancaria')?.value;

    if (!cuentaBancaria) {
        Swal.fire({
            icon: 'warning',
            title: 'Datos de transferencia incompletos',
            text: 'Por favor, ingresa el número de cuenta bancaria.',
        });
        return;
    }
} else if (formaDePago === 'paypal') {
    const correoPaypal = document.getElementById('correoPaypal')?.value;

    if (!correoPaypal) {
        Swal.fire({
            icon: 'warning',
            title: 'Correo de PayPal no ingresado',
            text: 'Por favor, ingresa tu correo de PayPal.',
        });
        return;
    }
}

Swal.fire({
    icon: 'success',
    title: 'Compra realizada',
    text: '¡Gracias por tu compra, te esperamos de vuelta!',
}).then(() => {
    // Cuando la compra se realiza, se eliminan los productos del carrito
    localStorage.removeItem("productoEnCarrito");
    // Esperar 1 segundo y redirigir al index
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
});
 });
