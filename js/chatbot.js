// chatbot.js
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// Función para manejar el envío de mensajes
sendBtn.addEventListener("click", () => handleUserInput());

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleUserInput();
});

function handleUserInput() {
    const userText = userInput.value.trim();
    if (!userText) return;

  // Mostrar mensaje del usuario
    appendMessage(userText, "user");

  // Obtener respuesta del chatbot
    const botResponse = getBotResponse(userText);

  // Mostrar respuesta del bot
    appendMessage(botResponse, "bot");

  // Limpiar el campo de entrada
    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(`${sender}-message`);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
}

const minimizeBtn = document.getElementById('minimize-btn');
const chatContainer = document.querySelector('.chat-container');
const chatIcon = document.getElementById('chat-icon');

// Evento para minimizar el chat
minimizeBtn.addEventListener('click', () => {
    chatContainer.classList.toggle('minimized');
    chatIcon.style.display = chatContainer.classList.contains('minimized') ? 'flex' : 'none';
});

// Evento para abrir el chat al hacer clic en el icono
chatIcon.addEventListener('click', () => {
    chatContainer.classList.remove('minimized');
    chatIcon.style.display = 'none';
});

function getBotResponse(input) {
  const lowerInput = input.toLowerCase();

    // Respuestas predefinidas del chatbot
    if (lowerInput.includes("hola")) {
        return "¡Hola! ¿En qué puedo ayudarte?";
    } else if (lowerInput.includes("productos") || lowerInput.includes("categorías")) {
      return "Puedes ver los productos navegando por las categorías o usando la barra de búsqueda. ¿Te gustaría ver algo específico?";
    } else if (lowerInput.includes("agregar al carrito") || lowerInput.includes("carrito")) {
      return "Para agregar un producto al carrito, haz clic en el botón 'Agregar al Carrito' en la página del producto.";
    } else if (lowerInput.includes("pago") || lowerInput.includes("métodos de pago")) {
      return "En este momento solo aceptamos pagos por transferencia bancaria o efectivo al recibir el producto.";
    } else if (lowerInput.includes("devolución") || lowerInput.includes("producto defectuoso")) {
      return "Si el producto está defectuoso, puedes solicitar una devolución contactando con el soporte.";
    } else if (lowerInput.includes("registrar") || lowerInput.includes("crear cuenta")) {
      return "Para registrarte, haz clic en 'Mi Perfil' en la parte superior del sitio y completa tus datos.";
    } else if (lowerInput.includes("vender")) {
      return "Si deseas vender productos, regístrate como vendedor y agrega los detalles en la sección 'Vender'.";
    } else if (lowerInput.includes("soporte")) {
      return "Puedes contactar con soporte desde la sección 'Mi Perfil' en el sitio.";
    } else if (lowerInput.includes("envío")) {
      return "El envío está disponible dentro del país, y tarda entre 5 y 7 días hábiles dependiendo de tu ubicación.";
    } else if (lowerInput.includes("política de privacidad")) {
      return "Puedes consultar nuestra política de privacidad en la parte inferior del sitio.";
    } else if (lowerInput.includes("garantía")) {
      return "Algunos productos incluyen garantía. Revisa la página del producto para más detalles.";
    } else {
      return "Lo siento, no entendí tu pregunta. Por favor, escribe solo una palabra a la vez, no frases!";
    }
  }
