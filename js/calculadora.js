document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = capitalizeFirstLetter(document.getElementById('nombre').value);
    const peso = parseFloat(document.getElementById('peso').value); 
    const genero = document.getElementById('genero').value;
    const estiloVida = document.getElementById('estiloVida').value;
    const objetivo = document.getElementById('objetivo').value;

    // Mostrar saludo basado en el género
    let saludo;
    if (genero === "masculino") {
        saludo = `Bienvenido ${nombre}`;    
    } else if (genero === "femenino") {
        saludo = `Bienvenida ${nombre}`;
    } else {
        saludo = `Hola ${nombre}`;
    }

    document.getElementById("saludo").innerText = saludo;

    // Calcular la proteína total
    const proteinaTotal = calcularProteina(peso, genero, estiloVida, objetivo);

    // Mostrar el resultado
    document.getElementById("resultado").innerHTML = `${nombre}, necesitas consumir aproximadamente <span class="proteinatexto">${proteinaTotal.toFixed(2)} gramos de proteína</span> al día.`;
});

function calcularProteina(peso, genero, estiloVida, objetivo) {
    // Cálculo del multiplicador basado en género
    const calculadoraGenero = genero === "masculino" ? 1.80 : genero === "femenino" ? 1.70 : 1.75;

    // Cálculo del multiplicador basado en estilo de vida
    const calculadoraEstiloVida = estiloVida === "sedentario" ? 1.0 : 1.2;

    // Cálculo del multiplicador basado en objetivo
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

    // Calcular la proteína total
    return peso * calculadoraGenero * calculadoraEstiloVida * calculadoraObjetivo;
}
