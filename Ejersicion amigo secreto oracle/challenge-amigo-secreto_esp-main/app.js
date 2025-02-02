// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = [];

function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (!nombre) {
        mostrarError('¡El nombre no puede estar vacío!');
        return;
    }

    if (amigos.includes(nombre)) {
        mostrarError('¡Este nombre ya está en la lista!');
        return;
    }

    amigos.push(nombre);
    actualizarListaAmigos();
    input.value = '';
    limpiarErrores();
}

function actualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = amigos.length > 0 
        ? amigos.map((amigo, index) => `
            <li>
                ${amigo}
                <button onclick="eliminarAmigo(${index})" class="delete-btn">×</button>
            </li>
        `).join('') 
        : '<li class="empty-message">No hay amigos añadidos</li>';
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarListaAmigos();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        mostrarError('¡Necesitas al menos 2 amigos para sortear!');
        return;
    }

    try {
        const pares = generarParesSecretos();
        mostrarResultado(pares);
    } catch (error) {
        mostrarError(error.message);
    }
}

function generarParesSecretos() {
    let shuffled = [...amigos];
    let intentos = 0;
    const maxIntentos = 100;

    // Verificar que nadie quede con sí mismo (derangement)
    do {
        shuffled = fisherYatesShuffle([...amigos]);
        intentos++;
    } while (shuffled.some((amigo, index) => amigo === amigos[index]) && intentos < maxIntentos);

    if (intentos >= maxIntentos) {
        throw new Error('No se pudo generar un sorteo válido. Intenta nuevamente.');
    }

    return amigos.map((amigo, index) => ({
        comprador: amigo,
        receptor: shuffled[index]
    }));
}

function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function mostrarResultado(pares) {
    const listaResultado = document.getElementById('resultado');
    listaResultado.innerHTML = pares.map(par => `
        <li class="result-item">
            <span class="gifter">${par.comprador}</span> 
            <span class="arrow">→</span> 
            <span class="receiver">${par.receptor}</span>
        </li>
    `).join('');
}

function mostrarError(mensaje) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = mensaje;
    
    const contenedor = document.querySelector('.input-section');
    contenedor.insertBefore(errorDiv, contenedor.firstChild);
    
    setTimeout(() => errorDiv.remove(), 3000);
}

function limpiarErrores() {
    document.querySelectorAll('.error-message').forEach(e => e.remove());
}