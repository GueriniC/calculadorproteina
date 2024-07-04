// Función para solicitar datos (y validar)     / entrada de datos
function solicitarDatos() {
    let peso, genero, estiloVida, objetivo;

    // Solicitar y validar el peso
    while (true) {
        peso = parseInt(prompt("Ingrese su peso en kg"));
        if (isNaN(peso) || peso <= 0) {
            alert("Ingrese un peso válido.");
        } else {
            break; 
        }
    }

    // Solicitar y validar el género
    while (true) {
        genero = prompt("Ingrese su género \nM: Masculino \nF: Femenino \nX: Otro género (tomará un promedio entre M y F)").toUpperCase();
        if (genero !== "M" && genero !== "F" && genero !== "X") {
            alert("Ingrese un género válido (M/F/X).");
        } else {
            break; 
        }
    }

    // Solicitar y validar el estilo de vida
    while (true) {
        estiloVida = parseInt(prompt("Ingrese su estilo de vida:\n1 Sedentario\n2 Activo"));
        if (estiloVida !== 1 && estiloVida !== 2) {
            alert("Ingrese 1 o 2 \n 1: Sedentario, 2: Activo.");
        } else {
            break;
        }
    }

    // Solicitar y validar el objetivo
    while (true) {
        objetivo = parseInt(prompt("Ingrese su objetivo: \n1 Perder peso \n2 Mantener peso \n3 Ganar músculo"));
        if (objetivo !== 1 && objetivo !== 2 && objetivo !== 3) {
            alert("Por favor, ingrese 1, 2 o 3 \n 1: Perder peso, 2: Mantener peso, 3: Ganar músculo.");
        } else {
            break; 
        }
    }

    // Convertir letra y número a nombre de índice
    genero = convertirGenero(genero);
    estiloVida = estiloVida === 1 ? "sedentario" : "activo";
    objetivo = objetivo === 1 ? "perder peso" : objetivo === 2 ? "mantener peso" : "ganar músculo";

    return [peso, genero, estiloVida, objetivo];
}

// Función para convertir el género a texto
function convertirGenero(genero) {
    if (genero === "M") {
        return "masculino";
    } else if (genero === "F") {
        return "femenino";
    } else {
        return "otro";
    }
}

// Funcion: Calculadora de proteina        / procesar datos
function calcularProteina(peso, genero, estiloVida, objetivo) {
    
    // primero: genero
    let calculadoraGenero;
    if (genero === "masculino") {
        calculadoraGenero =1.80;
    } else if (genero === "femenino") {
        calculadoraGenero = 1.70;
    } else {
        calculadoraGenero = 1.75;
    }

    // segundo: estilo de vida
    const calculoEstiloVida = estiloVida => estiloVida === "sedentario" ? 1.0 : 1.2;
    let calculadoraEstiloVida = calculoEstiloVida(estiloVida);

    // tercero: objetivo
    let calculadoraObjetivo;
    switch (objetivo) {
        case "perder peso":
            calculadoraObjetivo = 1.2;
            break;
        case "mantener peso":
            calculadoraObjetivo = 1.0;
            break;
        case "ganar músculo":
            calculadoraObjetivo = 1.5;
            break;

    }

    // Calculo con todas las variables
    let proteinaTotal = peso * calculadoraGenero * calculadoraEstiloVida * calculadoraObjetivo;
    return proteinaTotal;
}



//Llamo a la funcion
let datos = solicitarDatos();

//muestro datos ingresados por el usuario 
console.log(datos);


// Calcular la proteína total
let proteinaTotal = calcularProteina(datos[0], datos[1], datos[2], datos[3]);

// Mostrar el resultado
console.log(`Necesitas consumir aproximadamente ${proteinaTotal.toFixed(2)} gramos de proteína al día.`);
