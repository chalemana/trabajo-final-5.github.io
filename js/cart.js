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

// Muestra los productos en el carrito y actualiza subtotales y totales
function showCartProducts(productoEnCarrito) {
    let CartProductsContainer = document.getElementById('selectProductId');
    let cartSubtotal = document.getElementById('cartSubtotal');
    let cartEnvio = document.getElementById('cartShipping');
    let cartTotal = document.getElementById('cartTotal');
    let cartDiscount = document.getElementById('cartDiscount');
    let costoEnvio = 0; 
    let subtotalGeneral = 0;

    CartProductsContainer.innerHTML = ''; // Limpia el contenedor

    // Si el carrito está vacío, muestra un mensaje
    if (productoEnCarrito.length === 0) {
        CartProductsContainer.innerHTML = '<tr><td colspan="7">El carrito está vacío.</td></tr>';
        cartSubtotal.innerText = '0';
        cartEnvio.innerText = costoEnvio;
        cartTotal.innerText = costoEnvio;
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

    // Actualiza subtotales, envío y total
    cartSubtotal.innerText = subtotalGeneral;
    cartEnvio.innerText = costoEnvio;

    let total = subtotalGeneral + costoEnvio; // Calcula el total

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
    let cartTotal = document.getElementById('cartTotal').textContent; 
    let paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=tuemail@tuempresa.com&currency_code=USD&amount=${cartTotal}&item_name=Compra%20en%20tu%20sitio`;
    window.location.href = paypalUrl; // Redirige a PayPal
}

// Actualiza la cantidad de un producto en el carrito
function updateQuantity(index, change) {
    let productoEnCarrito = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];

    // Asegura que la cantidad no baje de 1 y muestra el carrito actualizado
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
    document.getElementById("cart-badge").textContent = `${totalItems} - $${document.getElementById('cartTotal').innerText}`;
}
