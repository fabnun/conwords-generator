const ConwordsGenerator = require('./ConwordsGenerator.js');
// En tu codigo puedes usar:
//const ConwordsGenerator = require('conwords-generator');

/**
 * //descripción del ejemplo:
 *
 * 1) Compila diccionarios de informática
 * 2) Genera una matriz de 18x16 con los diccionarios compilados
 * 3) Itera 8 veces
 * 4) Aplica el metodo completar para tener un mejor resultado final
 * 5) Imprime el resultado final y las preguntas
 * 6) Imprime las preguntas en formato JSON
 */

(async () => {
  //1) Compila los diccionarios
  const compilacion = await ConwordsGenerator.compilar([
    //Terminos de informática generados con el Chat GPT
    require('./diccionarios/gpt-informatica.json'),
    //Terminos de informática de trivia irc
    require('./diccionarios/trivia_informática.json'),
  ]);

  //2) Inicializa el generador con la compilación ya generada y una matriz de 36x36
  const generador = new ConwordsGenerator({ compilacion, ancho: 36, alto: 36 });
  let matriz = generador.generar();

  //3)Itera 60 veces
  for (let i = 0; i < 60; i++) {
    matriz = generador.iterar(matriz);
    console.log(`Iteración:${i + 1} Cruces:${matriz[0].cruces} Solas:${matriz[0].solas} ${Math.round((100 * matriz[0].llenado) / matriz[0].ancho / matriz[0].alto)}%`);
  }
  //4) Se aplica el metodo completar para llenar espacios vacios
  console.log('Completando...\n');
  matriz = generador.completar(matriz);

  //5) Imprime el resultado final, las preguntas y el json
  console.log(generador.toString(matriz, true));

  //6) Imprime las preguntas en formato JSON
  //console.log(JSON.stringify(generador.getJSON(matriz), null, 2));
})();
