// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = [];

function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (nombre) {
        if (!amigos.includes(nombre)) {
            amigos.push(nombre);
            actualizarListaAmigos();
            input.value = '';
        } else {
            alert('¡Este nombre ya está en la lista!');
        }
    }
}

function actualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = amigos.map(amigo => `<li>${amigo}</li>`).join('');
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert('¡Necesitas al menos 2 amigos para sortear!');
        return;
    }

    const copiaAmigos = [...amigos];
    const resultado = [];

    for (let amigo of amigos) {
        let posibleAmigo;
        do {
            posibleAmigo = copiaAmigos[Math.floor(Math.random() * copiaAmigos.length)];
        } while (posibleAmigo === amigo);

        resultado.push(`${amigo} ➔ ${posibleAmigo}`);
        copiaAmigos.splice(copiaAmigos.indexOf(posibleAmigo), 1);
    }

    const listaResultado = document.getElementById('resultado');
    listaResultado.innerHTML = resultado.map(item => `<li>${item}</li>`).join('');
}