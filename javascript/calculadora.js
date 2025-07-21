const pantalla = document.getElementById('pantalla');
let resultadoMostrado = false;

function agregarNumero(numero) {
    if (pantalla.value === '0' || resultadoMostrado) {
        pantalla.value = numero;
        resultadoMostrado = false;
    } else {
        pantalla.value += numero;
    }
}

function agregarPunto() {
    const partes = pantalla.value.split(/[+\-x/]/);
    const ultimoNumero = partes[partes.length - 1];
    if (!ultimoNumero.includes('.')) {
        pantalla.value += '.';
    }
}

function agregarOperador(operador) {
    if (resultadoMostrado) resultadoMostrado = false;
    const ultimoCaracter = pantalla.value[pantalla.value.length - 1];
    const operadores = ['+', '-', 'x', '/'];
    if (operador === '+/-') {
        cambiarSigno();
        return;
    }
    if (operadores.includes(ultimoCaracter)) {
        pantalla.value = pantalla.value.slice(0, -1) + operador;
    } else {
        pantalla.value += operador;
    }
}

function calcularResultado() {
    try {
        let expresion = pantalla.value.replace(/x/g, '*');
        pantalla.value = eval(expresion);
        resultadoMostrado = true;
    } catch {
        pantalla.value = 'Error';
    }
}
function calcularPorcentaje() {
    try {
        const regex = /(\d+(\.\d+)?)(?!.*\d)/;
        const match = pantalla.value.match(regex);

        if (match) {
            const numero = parseFloat(match[0]);
            const porcentaje = numero / 100;

            // Reemplazar solo ese último número con su equivalente en decimal
            pantalla.value = pantalla.value.replace(regex, porcentaje);
        }
    } catch {
        pantalla.value = 'Error';
    }
}


function borrarTodo() {
    pantalla.value = '0';
    resultadoMostrado = false;
}

function borrarUltimaEntrada() {
    pantalla.value = '0';
}

function borrarIngreso() {
    if (pantalla.value.length > 1 && pantalla.value!="Error") {
        pantalla.value = pantalla.value.slice(0, -1);
    } else if (pantalla.value==="Error"){
        pantalla.value = "Error";
    } else {
        pantalla.value = "0";
    }
}

function calcularInverso() {
    const regex = /(\d+(\.\d+)?)(?!.*\d)/;
    const match = pantalla.value.match(regex);

    if (match) {
        const numero = parseFloat(match[0]);
        if (numero === 0) {
            pantalla.value = "Error";
            return;
        }
        const resultado = 1 / numero;
        pantalla.value = pantalla.value.replace(regex, resultado);
        resultadoMostrado = true;
    } else {
        pantalla.value = "Error";
    }
}

function elevarAlCuadrado() {
    const regex = /(\d+(\.\d+)?)(?!.*\d)/;
    const match = pantalla.value.match(regex);

    if (match) {
        const numero = parseFloat(match[0]);
        const resultado = Math.pow(numero, 2);
        pantalla.value = pantalla.value.replace(regex, resultado);
        resultadoMostrado = true;
    } else {
        pantalla.value = "Error";
    }
}

function calcularRaizCuadrada() {
    const regex = /(\d+(\.\d+)?)(?!.*\d)/;
    const match = pantalla.value.match(regex);

    if (match) {
        const numero = parseFloat(match[0]);
        if (numero < 0) {
            pantalla.value = "Error";
            return;
        }
        const resultado = Math.sqrt(numero);
        pantalla.value = pantalla.value.replace(regex, resultado);
        resultadoMostrado = true;
    } else {
        pantalla.value = "Error";
    }
}

function cambiarSigno() {
    const regex = /([+\-*/])?(\-?\d+(\.\d+)?)(?!.*\d)/;
    const match = pantalla.value.match(regex);

    if (match) {
        const operador = match[1] || '';
        let numero = match[2];
        let nuevoNumero = '';

        if (numero.startsWith('-')) {
            nuevoNumero = numero.slice(1);
        } else {
            nuevoNumero = '-' + numero;
        }

        pantalla.value = pantalla.value.replace(regex, `${operador}${nuevoNumero}`);
    }
}

