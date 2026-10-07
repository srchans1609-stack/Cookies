
console.log("CookieLab iniciado");

//Función auxiliar para leer una cookie concreta

function leerCookie(nombreBusqueda) {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=");
        if (cookie[0] === nombreBusqueda) {
            return cookie[1];
        }
    }
    return null;
}

// Pedir, guardar y recordar el nombre 
function gestionarUsuario() {
    let usuario = leerCookie("usuario");
    let saludoElemento = document.getElementById("saludo");
    let idioma = leerCookie("idioma") || "es";

    if (!usuario) { // Si NO existe la cookie (Primera visita)
        usuario = prompt("¿Cuál es tu nombre?");
        if (usuario) {
            // Se guarda por 30 días 
            document.cookie = `usuario=${usuario}; max-age=2592000`;
            alert(`¡Bienvenido, ${usuario}!`);
        } else {
            usuario = "Invitado"; // Por si cancela el prompt
        }
    }
    
    // Si YA existe, saludamos directamente. Aplicamos el idioma de la Fase 3.
    if (idioma === "en") {
        saludoElemento.textContent = `Hello again, ${usuario}`;
    } else {
        saludoElemento.textContent = `Hola de nuevo, ${usuario}`;
    }
}

//Preferencias: tema e idioma
function gestionarPreferencias() {
    const selectTema = document.getElementById("select-tema");
    const selectIdioma = document.getElementById("select-idioma");

    // 1. Aplicar las preferencias al cargar
    let temaGuardado = leerCookie("tema");
    let idiomaGuardado = leerCookie("idioma");

    if (temaGuardado) {
        document.body.className = temaGuardado;
        selectTema.value = temaGuardado;
    }
    if (idiomaGuardado) {
        selectIdioma.value = idiomaGuardado;
    }

    // 2. Guardar cookies cuando cambian los desplegables
    selectTema.addEventListener("change", () => {
        document.cookie = `tema=${selectTema.value}; max-age=2592000`;
        document.body.className = selectTema.value; // Aplicamos la clase CSS
    });

    selectIdioma.addEventListener("change", () => {
        document.cookie = `idioma=${selectIdioma.value}; max-age=2592000`;
        gestionarUsuario(); // Refresca el saludo en el nuevo idioma
    });
}

//Contador de visitas
function gestionarVisitas() {
    let visitas = leerCookie("visitas");
    
    if (!visitas) {
        visitas = 1; // Si no existe, empieza en 1
    } else {
        visitas = Number(visitas) + 1; // Convertir texto a número y sumar 1
    }
    
    // Guardar nuevo valor y mostrar en pantalla
    document.cookie = `visitas=${visitas}; max-age=2592000`;
    document.getElementById("contador").textContent = `Has visitado esta página ${visitas} veces.`;
}

// Panel de control
function gestionarPanel() {
    // Botón Cambiar Nombre
    document.getElementById("btn-cambiar").addEventListener("click", () => {
        let nuevoNombre = prompt("Introduce tu nuevo nombre:");
        if (nuevoNombre) {
            document.cookie = `usuario=${nuevoNombre}; max-age=2592000`;
            gestionarUsuario(); // Refresca el saludo
        }
    });

    // Botón Olvidarme
    document.getElementById("btn-olvidar").addEventListener("click", () => {
        let confirmar = confirm("¿Estás seguro de que quieres borrar todos tus datos?");
        if (confirmar) {
            
            document.cookie = "usuario=; max-age=0";
            document.cookie = "tema=; max-age=0";
            document.cookie = "idioma=; max-age=0";
            document.cookie = "visitas=; max-age=0";
            
            
            location.reload(); 
        }
    });
}


window.onload = () => {
    gestionarUsuario();
    gestionarPreferencias();
    gestionarVisitas();
    gestionarPanel();
};