const AUTO_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

const container = document.getElementById("container");

function showData(productsArray) {
    let Content = '';
    for (const product of productsArray) {
        Content += `
            <tr>
                <td><img src="${product.image}" alt="Imagen del Producto"></td>
                <td>
                    <div class="descripcion"><strong>Nombre:</strong> ${product.name}</div>
                    <div class="descripcion"><strong>Descripción:</strong> ${product.description}</div>
                    <div class="descripcion"><strong>Precio:</strong> ${product.cost + " " + product.currency}</div>
                    <div class="descripcion"><strong>Cantidad de Vendidos:</strong> ${product.soldCount}</div>
                </td>
            </tr>`;
    }
    container.innerHTML = Content;
}

fetch(AUTO_URL)
    .then(response => response.json())
    .then(data => {
        showData(data.products); 
    })
    .catch(error => {
        console.error('Error con fetch', error);
    });


const JUGUETE_URL = "https://japceibal.github.io/emercado-api/cats_products/102.json"; 
const MUEBLES = "https://japceibal.github.io/emercado-api/cats_products/103.json"; 

const articulos = [
   
        {
            "id": 50921,
            "name": "Chevrolet Onix Joy",
            "description": "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.",
            "cost": 13500,
            "currency": "USD",
            "soldCount": 14,
            "image": "img/prod50921_1.jpg"
        },
        {
            "id": 50922,
            "name": "Fiat Way",
            "description": "La versión de Fiat que brinda confort y a un precio accesible.",
            "cost": 14500,
            "currency": "USD",
            "soldCount": 52,
            "image": "img/prod50922_1.jpg"
        },
        {
            "id": 50923,
            "name": "Suzuki Celerio",
            "description": "Un auto que se ha ganado la buena fama por su economía con el combustible.",
            "cost": 12500,
            "currency": "USD",
            "soldCount": 25,
            "image": "img/prod50923_1.jpg"
        },
        {
            "id": 50924,
            "name": "Peugeot 208",
            "description": "El modelo de auto que se sigue renovando y manteniendo su prestigio en comodidad.",
            "cost": 15200,
            "currency": "USD",
            "soldCount": 17,
            "image": "img/prod50924_1.jpg"
        },
        {
            "id": 50925,
            "name": "Bugatti Chiron",
            "description": "El mejor hiperdeportivo de mundo. Producción limitada a 500 unidades.",
            "cost": 3500000,
            "currency": "USD",
            "soldCount": 0,
            "image": "img/prod50925_1.jpg"
        },
        {
            "id": 50741,
            "name": "Oso de peluche",
            "description": "Oso de peluche gigante, con el bebé. Resistente y lavable. Tus hijos los amarán",
            "cost": 2400,
            "currency": "UYU",
            "soldCount": 97,
            "image": "img/prod50741_1.jpg"
        },
        {
            "id": 50742,
            "name": "Pelota de básquetbol",
            "description": "Balón de baloncesto profesional, para interiores, tamaño 5, 27.5 pulgadas. Oficial de la NBA",
            "cost": 2999,
            "currency": "UYU",
            "soldCount": 11,
            "image": "img/prod50742_1.jpg"
        },
        {
            "id": 50743,
            "name": "PlayStation 5",
            "description": "Maravíllate con increíbles gráficos y disfruta de nuevas funciones de PS5. Con E/S integrada.",
            "cost": 59999,
            "currency": "UYU",
            "soldCount": 16,
            "image": "img/prod50743_1.jpg"
        },
        {
            "id": 50744,
            "name": "Bicicleta",
            "description": "¡La mejor BMX pequeña del mercado! Frenos traseros y cuadro duradero de acero Hi-Ten.",
            "cost": 10999,
            "currency": "UYU",
            "soldCount": 8,
            "image": "img/prod50744_1.jpg"
        },
                {
                    "id": 60801,
                    "name": "Juego de comedor",
                    "description": "Un conjunto sencillo y sólido, ideal para zonas de comedor pequeñas, hecho en madera maciza de pino",
                    "cost": 4000,
                    "currency": "UYU",
                    "soldCount": 88,
                    "image": "img/prod60801_1.jpg"
                },
                {
                    "id": 60802,
                    "name": "Sofá",
                    "description": "Cómodo sofá de tres cuerpos, con chaiselongue intercambiable. Ideal para las siestas",
                    "cost": 24000,
                    "currency": "UYU",
                    "soldCount": 12,
                    "image": "img/prod60802_1.jpg"
                },
                {
                    "id": 60803,
                    "name": "Armario",
                    "description": "Diseño clásico con puertas con forma de panel. Espejo de cuerpo entero para ver cómo te queda la ropa",
                    "cost": 8000,
                    "currency": "UYU",
                    "soldCount": 24,
                    "image": "img/prod60803_1.jpg"
                },
                {
                    "id": 60804,
                    "name": "Mesa de centro",
                    "description": "Añade más funciones a tu sala de estar, ya que te permite cambiar fácilmente de actividad.",
                    "cost": 10000,
                    "currency": "UYU",
                    "soldCount": 37,
                    "image": "img/prod60804_1.jpg"
                }
    ];
   
   
   
   
    

articulos.sort((a,b)=> a.cost - b.cost);
for(let costo of articulos) {
    console.log(costo.name + " " + costo.cost);
}



document.addEventListener('DOMContentLoaded', () => {
document.getElementById("botonFiltro").addEventListener('click', () => {
articulos.sort((a, b) => a.cost - b.cost);

});
});
 



document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("botonFiltroDos").addEventListener('click', () => {
    articulos.sort((a, b) => b.soldCount - a.soldCount);
    
    });
    });