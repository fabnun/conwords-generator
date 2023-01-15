**conwords-generator**d

instalar conwords-generator

```bash
npm i conwords-generator
```

importar conwords-generator

```js
const ConwordsGenerator = require('conwords-generator');
```

Dado uno o varios diccionarios de términos y definiciones, permite generar crucigramas mediante una implementación de algoritmos genéticos.

Los diccionarios deben ser arrays de arrays con la siguiente estructura:

```txt
[
  [
    /**Respuesta*/
    String,
    /**Pregunta 1*/
    String,
    /**Pregunta 2*/
    String,...
  ],..
]
```

Por ejemplo:

```txt
[
  ["hola", "saludo", "saludo informal"],
  ["adios", "despedida", "despedida formal", "chao"]
]
```

[Ver mas diccionarios.](https://github.com/fabnun/conwords-generator/tree/main/src/diccionarios)

Antes de generar un crucigrama se debe realizar una compilación de diccionarios, donde se selecciona que diccionarios vas a usar. Esta compilación permite generar los crucigramas más rápido, y se realiza de la siguiente manera:

```js
//En una sola compilación se incluyen 2 diccionarios
const compilacionInformatica = ConwordsGenerator.compilar([
  //
  diccionarioGPTInformatica,
  diccionarioTriviaInformatica,
]);
```

El siguiente paso es inicializar un Generador de Crucigramas:

```js
/**El generador usará compilacionInformatica
 * para crear crucigramas tamaño 16x16  */
const generador = new ConwordsGenerator({
  compilacion: compilacionInformatica,
  ancho: 16,
  alto: 16,
});
```

Luego se debe iniciar la matriz sobre la que trabajara el algoritmo, luego se debe iterar sobre esa matriz para obtener los mejores resultados, para finalmente aplicar un método que completa los espacios restantes.

```js
//Genera una matriz inicial
let matriz = generador.generar();
//Itera 12 veces, mejorando la solución en cada iteración
for (let i = 0; i < 8; i++) {
  matriz = generador.iterar(matriz);
}
//Completa los espacios restantes
matriz = generador.completar(matriz);
```

Luego puede ver el resultado mediante: console.log(generador.toString(matriz[0], true))

```txt
    0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5

00  · · R D · · R E T U R N · A I ·
01  D D · E · R · · E · · O · N · I
02  E · A S S E M B L E R · C D · N
03  S · · C · N · · N · · I · R · S
04  P I · A U · W · E V E N T O · E
05  L · · R · · O · T · · · · I · R
06  A · I G N O R E · C L O U D · T
07  Z · · A · · D · S · E · · · · B
08  A W S · K · P R I N T · D O C E
09  M · E · E · R · · S · · · L · F
10  I N T E R N E T · A T · N E R O
11  E · · · N · S · Q · A · E · · R
12  N · · T E N S O R F L O W · · E
13  T R Y · L · · · · · K · S S H ·
14  O · · P · I · · · A · B · U · ·
15  · E N C A P S U L A C I Ó N · ·


HORIZONTAL:
0200:RD: MS-DOS: COMANDO PARA BORRAR UN DIRECTORIO
1300:AI: INTELIGENCIA ARTIFICIAL. PARTE DE LA INFORMÁTICA QUE ESTUDIA LA SIMULACIÓN DE LA INTELIGENCIA
0001:DD: SÍMBOLO DEL FORMATO DE DÍA EN 2 DÍGITOS, EN ESPAÑOL
...
```

Y tambien puede obtener el resultado en formato JSON mediante: generador.getPreguntas(matriz) con el siguiente formato:

```txt
[
  {
    /**respuesta (debe tener solo letras (pueden tener acentos),
     sin espacios,  sin números, sin caracteres especiales)*/
    "palabra": String,
    /**true si la pregunta es horizontal y false si es vertical*/
    "horizontal": boolean,
    /**posición x de la palabra en la matriz (comienza en 0)*/
    "x": int,
    /**posición y de la palabra en la matriz (comienza en 0)*/
    "y": int,
    /**pregunta o definición de la palabra*/
    "pregunta": String
  },...
]
```

Los parámetros por defecto del generador son:

```js
   {Object} options.compilacion - Compilación  de diccionarios (null por defecto, debe proveerse)
   {Number} options.ancho - Ancho del crucigrama (24 por defecto)
   {Number} options.alto - Alto del crucigrama (22 por defecto)
   {String} options.espacioVacio - Carácter del espacio no usado ('·' por defecto)
   {Number} options.palabrasPorIteracion - Cantidad de palabras agregadas en cada nueva iteración (2 por defecto)
   {Number} options.solucionesSeleccionadas - Cantidad de soluciones seleccionadas de la generación anterior para ser usadas en la siguiente iteración (22 por defecto)
   {Number} options.solucionesPorIteracion - Cantidad de soluciones generadas en iteración, a partir de las soluciones seleccionadas de la generación anterior (33 por defecto)
   {Number} options.palabrasEnBorde - Cantidad de palabras en los bordes [0, 1] (0.9 por defecto)
   {Number} options.factorLargoMinimo - Factor de disminución del largo minimo en las iteraciones: mientras sea mayor mas rapidamente el largo minimo de las palabras ira disminuyendo entre cada iteración (1 por defecto)
   {Number} options.finishAt - Cantidad maximo de intentos para encontrar una solucion, despues de alcanzado estos intentos esa solución se marca como finalizado y no se intentaran mas soluciones (600 por defecto)
   {Function} options.fnPuntaje - Es una función que asigna un puntaje al crucigrama y que depende del porcentaje de llenado, la cantidad de cruces de palabras y la cantidad de palabras solas (que no se cruzan con otras) ((llenado * 4 + 2 * cruces) / (1 + solas * 4) por defecto))
```

[Ver código de ejemplo](https://github.com/fabnun/conwords-generator/blob/main/src/index.js)
