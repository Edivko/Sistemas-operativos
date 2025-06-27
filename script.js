// === Carrusel automático de banners ===
let currentBanner = 0;
const banners = document.querySelectorAll('.banner-img');

setInterval(() => {
  banners[currentBanner].classList.remove('active');
  currentBanner = (currentBanner + 1) % banners.length;
  banners[currentBanner].classList.add('active');
}, 8000); // Cambia cada 4 segundos

// === Redirigir al contenido de teoría ===
function irA61home() {
  window.location.href = "6.1Home.html";
}

function irA62home() {
  window.location.href = "6.2Home.html";

}function irA53home() {
  window.location.href = "5.3Home.html";
}

// === Acciones al cargar el documento ===
document.addEventListener("DOMContentLoaded", function () {
  // Botón para mostrar/ocultar el menú lateral (modo responsive)
  const btnTemario = document.getElementById("btnTemario");
  const menuLateral = document.querySelector(".menu-lateral");
  if (btnTemario && menuLateral) {
    btnTemario.addEventListener("click", function () {
      menuLateral.classList.toggle("visible");
    });
  }

  // Menú hamburguesa principal (móvil)
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    // Abrir o cerrar con clic en el botón
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // evita que el clic se propague al document
      navMenu.classList.toggle('show');
    });

    // Cerrar si el usuario hace clic fuera del menú o del botón
    document.addEventListener('click', (e) => {
      const isClickInside = navMenu.contains(e.target) || menuToggle.contains(e.target);
      if (!isClickInside) {
        navMenu.classList.remove('show');
      }
    });
  }

  // Mostrar/ocultar submenús tipo dropdown (para móviles)
  document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const menu = btn.nextElementSibling;
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
  });
});

// === Mostrar el footer cuando se llega al final de la página ===
const footer = document.querySelector('.footer-oscuro');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.offsetHeight;

  // Mostrar el footer solo al final de la página
  if (scrollY + windowHeight >= bodyHeight - 10) {
    footer.classList.add('visible');
  } else {
    footer.classList.remove('visible');
  }
});

// SCRIPT PARA ACTIVIDADES.

document.addEventListener("DOMContentLoaded", function () {
  const botones = document.querySelectorAll(".acordeon-btn");

  botones.forEach(btn => {
    btn.addEventListener("click", function () {
      const panel = this.nextElementSibling;
      const isActive = this.classList.contains("active");

      // Oculta todos los paneles y remueve clases activas
      document.querySelectorAll(".acordeon-panel").forEach(p => p.style.display = "none");
      document.querySelectorAll(".acordeon-btn").forEach(b => b.classList.remove("active"));

      // Si el botón no estaba activo, activa este y muestra su panel
      if (!isActive) {
        panel.style.display = "block";
        this.classList.add("active");
      }
    });
  });
});

// VALIDACIÓN DE RESPUESTAS GENERALIZADA
function validarRespuesta(nombrePregunta, valorCorrecto) {
  const opciones = document.getElementsByName(nombrePregunta);
  let seleccion = "";
  opciones.forEach(op => {
    if (op.checked) seleccion = op.value;
  });

  const feedback = document.getElementById("feedback-" + nombrePregunta);
  if (!seleccion) {
    feedback.innerHTML = "Selecciona una respuesta para continuar.";
    feedback.style.color = "orange";
  } else if (seleccion === valorCorrecto) {
    feedback.innerHTML = "¡Respuesta correcta!";
    feedback.style.color = "green";
  } else {
    feedback.innerHTML = "Respuesta incorrecta. Inténtalo de nuevo.";
    feedback.style.color = "red";
  }
}
// Validacion de caja completar codigo.
function validarComandos() {
  const respuestas = {
    cmd1: "adduser",
    cmd2: "adduser",
    cmd3: "touch",
    cmd4: "chown",
    cmd5: "chmod"
  };

  let retroalimentacion = "";
  let correcto = true;

  for (let id in respuestas) {
    const input = document.getElementById(id);
    const valor = input.value.trim().toLowerCase();
    const esperado = respuestas[id];

    if (valor === esperado) {
      input.style.border = "2px solid green";
      retroalimentacion += `<p style="color:green;">${id.toUpperCase()} correcto</p>`;
    } else {
      input.style.border = "2px solid red";
      correcto = false;
      retroalimentacion += `<p style="color:red;">${id.toUpperCase()} incorrecto. Esperado: <code>${esperado}</code></p>`;
    }
  }

  const feedback = document.getElementById("feedback-cmds");
  feedback.innerHTML = correcto
    ? "<p style='color:green; font-weight:bold;'>¡Todos los comandos son correctos!</p>"
    : retroalimentacion;
}
/* caja */
function validarEmparejamiento() {
  const respuestas = {
    emp1: "a", // DAC
    emp2: "c", // MAC
    emp3: "b"  // RBAC
    
  };

  let correcto = true;
  let feedbackHTML = "";

  for (let id in respuestas) {
    const input = document.getElementById(id);
    const valor = input.value.trim().toLowerCase();
    const esperado = respuestas[id];

    if (valor === esperado) {
      input.style.border = "2px solid green";
      feedbackHTML += `<p style="color:green;"> ${id.toUpperCase()} correcto</p>`;
    } else {
      input.style.border = "2px solid red";
      correcto = false;
      feedbackHTML += `<p style="color:red;"> ${id.toUpperCase()} incorrecto. Respuesta esperada: <code>${esperado}</code></p>`;
    }
  }

  const feedback = document.getElementById("feedback-emparejamiento");
  feedback.innerHTML = correcto
    ? "<p style='color:green; font-weight:bold;'>¡Emparejamiento correcto!</p>"
    : feedbackHTML;
}
/* VALIDACION DE LA MATRIZ DE TABLAS */
function validarPreguntaMatriz() {
  const seleccionada = document.querySelector('input[name="opcionMatriz"]:checked');
  const feedback = document.getElementById("feedback-pregunta-matriz");

  if (!seleccionada) {
    feedback.innerHTML = "<span style='color: orange;'>Selecciona una opción para validar.</span>";
    return;
  }

  if (seleccionada.value === "c") {
    feedback.innerHTML = "<span style='color: green;'> ¡Respuesta correcta!</span>";
  } else {
    feedback.innerHTML = "<span style='color: red;'> Respuesta incorrecta. La opción correcta es: <strong>C</strong>.</span>";
  }
}

function validarMatrizAcceso() {
  const respuestas = {
    mat1: "rw",
    mat2: "-",
    mat3: "r",
    mat4: "-",
    mat5: "rw",
    mat6: "rx",
    mat7: "x",
    mat8: "rwx",
    mat9: "-"
  };

  let correcto = true;
  let feedbackHTML = "";

  for (let id in respuestas) {
    const input = document.getElementById(id);
    const valor = input.value.trim().toLowerCase();
    const esperado = respuestas[id];

    if (valor === esperado) {
      input.style.border = "2px solid green";
    } else {
      input.style.border = "2px solid red";
      correcto = false;
      feedbackHTML += `<p style="color:red;"> ${id.toUpperCase()} incorrecto. Debe ser: <code>${esperado.toUpperCase()}</code></p>`;
    }
  }

  const feedback = document.getElementById("feedback-matriz");
  feedback.innerHTML = correcto
    ? "<p style='color:green; font-weight:bold;'>¡Matriz completada correctamente!</p>"
    : feedbackHTML;
}

/* SECCION 6.2 VALIDCACION  */
function validarEmparejamientoEmu() {
  const respuestas = {
    emu1: "v",
    emu2: "d",
    emu3: "v",
    emu4: "d"
  };

  let correcto = true;
  let feedbackHTML = "";

  for (let id in respuestas) {
    const input = document.getElementById(id);
    const valor = input.value.trim().toLowerCase();
    const esperado = respuestas[id];

    if (valor === esperado) {
      input.style.border = "2px solid green";
      feedbackHTML += `<p style="color:green;">✅ ${id.toUpperCase()} correcto</p>`;
    } else {
      input.style.border = "2px solid red";
      correcto = false;
      feedbackHTML += `<p style="color:red;">❌ ${id.toUpperCase()} incorrecto. Debe ser: <strong>${esperado.toUpperCase()}</strong></p>`;
    }
  }

  const feedback = document.getElementById("feedback-emparejamiento-emu");
  feedback.innerHTML = correcto
    ? "<p style='color:green; font-weight:bold;'>¡Emparejamiento correcto!</p>"
    : feedbackHTML;
}

function validarEmparejamientoVirt() {
  const respuestas = {
    virt1: "a",
    virt2: "c",
    virt3: "b"
  };

  let correcto = true;
  let feedbackHTML = "";

  for (let id in respuestas) {
    const input = document.getElementById(id);
    const valor = input.value.trim().toLowerCase();
    const esperado = respuestas[id];

    if (valor === esperado) {
      input.style.border = "2px solid green";
      feedbackHTML += `<p style="color:green;">✅ ${id.toUpperCase()} correcto</p>`;
    } else {
      input.style.border = "2px solid red";
      correcto = false;
      feedbackHTML += `<p style="color:red;">❌ ${id.toUpperCase()} incorrecto. Respuesta esperada: <strong>${esperado.toUpperCase()}</strong></p>`;
    }
  }

  const feedback = document.getElementById("feedback-emparejamiento-virt");
  feedback.innerHTML = correcto
    ? "<p style='color:green; font-weight:bold;'>¡Emparejamiento correcto!</p>"
    : feedbackHTML;
}
// paravritualizaion
function validarVentajasDesventajas() {
  const respuestas = {
    ventaja1: "rendimiento mejorado",
    ventaja2: "interacción más directa",
    desventaja1: "requiere modificar el sistema operativo invitado",
    desventaja2: "menor compatibilidad"
  };

  let correcto = true;
  let feedback = "";

  for (let id in respuestas) {
    const input = document.getElementById(id);
    const valor = input.value.trim().toLowerCase();
    const esperado = respuestas[id];

    if (valor.includes(esperado)) {
      input.style.border = "2px solid green";
      feedback += `<p style="color:green;">${id.toUpperCase()} correcto</p>`;
    } else {
      input.style.border = "2px solid red";
      correcto = false;
      feedback += `<p style="color:red;">${id.toUpperCase()} incorrecto. Respuesta esperada: <code>${esperado}</code></p>`;
    }
  }

  const feedbackBox = document.getElementById("feedback-vd");
  feedbackBox.innerHTML = correcto
    ? "<p style='color:green; font-weight:bold;'>¡Tabla completada correctamente!</p>"
    : feedback;
}
// contendedores
function validarEmparejamientoContenedores() {
  const respuestas = {
    emp1_u624: "b", // Docker
    emp2_u624: "a", // Kubernetes
    emp3_u624: "c"  // Namespaces
  };

  let correcto = true;
  let feedbackHTML = "";

  for (let id in respuestas) {
    const input = document.getElementById(id);
    const valor = input.value.trim().toLowerCase();
    const esperado = respuestas[id];

    if (valor === esperado) {
      input.style.border = "2px solid green";
      feedbackHTML += `<p style="color:green;">${id.toUpperCase()} correcto</p>`;
    } else {
      input.style.border = "2px solid red";
      correcto = false;
      feedbackHTML += `<p style="color:red;">${id.toUpperCase()} incorrecto. Respuesta esperada: <code>${esperado}</code></p>`;
    }
  }

  const feedback = document.getElementById("feedback-emparejamiento-contenedores");
  feedback.innerHTML = correcto
    ? "<p style='color:green; font-weight:bold;'>¡Emparejamiento correcto!</p>"
    : feedbackHTML;
}
