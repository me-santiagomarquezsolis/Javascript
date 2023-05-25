// Obtenemos la referencia al elemento canvas del DOM.
var canvas = document.getElementById('canvas');

// Obtenemos el contexto de renderizado 2D para el canvas.
var ctx = canvas.getContext('2d');

// Ajustamos el ancho y alto del canvas al tamaño completo de la ventana del navegador.
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Definimos los caracteres que queremos que aparezcan en la cascada.
var matrixCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()_+';

// Convertimos la cadena de caracteres en un array.
matrixCharacters = matrixCharacters.split('');

// Definimos el tamaño de la fuente de los caracteres.
var font_size = 10;

// Calculamos cuántas columnas de caracteres necesitaremos.
var columns = canvas.width/font_size;

// Creamos un array para rastrear la posición y (altura) de cada gota en cada columna.
var drops = [];

// Inicializamos todas las gotas en la posición y=1.
for(var x = 0; x < columns; x++)
  drops[x] = 1;

// Esta función se ejecutará repetidamente para dibujar y actualizar el canvas.
function draw() {
  // Rellenamos el canvas con un color negro semitransparente para suavizar los caracteres antiguos.
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Cambiamos el color de relleno a verde para los caracteres nuevos.
  ctx.fillStyle = '#0f0';

  // Definimos la fuente de los caracteres.
  ctx.font = font_size + 'px arial';

  // Para cada columna...
  for(var i = 0; i < drops.length; i++) {
    // Escogemos un carácter aleatorio del array.
    var text = matrixCharacters[Math.floor(Math.random()*matrixCharacters.length)];

    // Dibujamos el carácter en la posición (i*font_size, drops[i]*font_size).
    ctx.fillText(text, i*font_size, drops[i]*font_size);

    // Si la gota ha llegado al fondo del canvas y hay una pequeña probabilidad aleatoria...
    if(drops[i]*font_size > canvas.height && Math.random() > 0.975)
      // Resetamos la gota al principio de la pantalla.
      drops[i] = 0;

    // De lo contrario, incrementamos la posición y de la gota.
    drops[i]++;
  }
}

// Llamamos a la función draw cada 33 milisegundos (alrededor de 30 veces por segundo) para crear la animación.
setInterval(draw, 33);
