// malla.js

document.addEventListener("DOMContentLoaded", function () {
  const malla = document.getElementById("malla");
  const info = document.getElementById("info");

  const semestres = [
    { id: 1, nombre: "Primer semestre", ramos: [
      { id: "au1", nombre: "Bases moleculares" },
      { id: "mmi001", nombre: "Introducción al manejo de la información" },
      { id: "du10", nombre: "Métodos de cuantificación" },
      { id: "cu7", nombre: "Diversidad animal" },
      { id: "omv001", nombre: "Orientación a la medicina veterinaria" }
    ] },
    // Agrega aquí los demás semestres con sus asignaturas...
  ];

  const requisitos = {
    au3: ["au1"],
    // ... y todos los demás requisitos definidos antes
    micb: [
      "au1", "mmi001", "du10", "cu7", "omv001",
      "au3", "sem-a", "au2", "bu4", "bu5", "cu8", "du11",
      "eu13", "cu9", "du12", "gu18_19"
    ],
    micp: [
      "au1", "mmi001", "du10", "cu7", "omv001",
      "au3", "sem-a", "au2", "bu4", "bu5", "cu8", "du11",
      "eu13", "cu9", "du12", "gu18_19",
      "maep", "bu6", "eu14", "eu15", "fu16", "iu24", "micb",
      "maig", "fu17", "hu20", "iu26", "ju30",
      "maat", "hu21", "iu25", "iu27", "ju31",
      "maca", "hu22", "hu23", "iu28", "iu29", "mu38", "ku32"
    ]
    // ... incluye también los requisitos de los demás ramos
  };

  function crearAsignatura(asig) {
    const div = document.createElement("div");
    div.className = "asignatura";
    div.id = `a-${asig.id}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = asig.id;

    checkbox.addEventListener("change", () => {
      actualizarEstados();
      actualizarProgreso();
    });

    div.appendChild(checkbox);
    div.appendChild(document.createTextNode(asig.nombre));
    div.addEventListener("click", () => mostrarInfo(asig.id));
    return div;
  }

  function crearSemestre(sem) {
    const cont = document.createElement("div");
    cont.className = "semestre";
    cont.id = `sem${sem.id}`;

    const titulo = document.createElement("h3");
    titulo.textContent = sem.nombre;
    cont.appendChild(titulo);

    const progCont = document.createElement("div");
    progCont.className = "progress-container";

    const progBar = document.createElement("div");
    progBar.className = "progress-bar";
    progBar.id = `prog-sem${sem.id}`;

    progCont.appendChild(progBar);
    cont.appendChild(progCont);

    sem.ramos.forEach(r => cont.appendChild(crearAsignatura(r)));
    return cont;
  }

  function mostrarInfo(id) {
    const reqs = requisitos[id];
    if (!reqs || reqs.length === 0) {
      info.textContent = "Sin requisitos.";
    } else {
      info.textContent = "Requiere: " + reqs.join(", ");
    }
  }

  function requisitosCumplidos(reqs) {
    return reqs.every(id => document.getElementById(id)?.checked);
  }

  function actualizarEstados() {
    Object.keys(requisitos).forEach(id => {
      const ch = document.getElementById(id);
      const div = document.getElementById("a-" + id);
      if (!ch || !div) return;

      const cumplidos = requisitosCumplidos(requisitos[id]);
      ch.disabled = !cumplidos;
      if (!cumplidos) {
        ch.checked = false;
        div.classList.add("disabled");
      } else {
        div.classList.remove("disabled");
      }
    });
  }

  function actualizarProgreso() {
    for (let i = 1; i <= 10; i++) {
      const div = document.getElementById(`sem${i}`);
      if (!div) continue;

      const checks = div.querySelectorAll("input[type=checkbox]");
      const total = [...checks].filter(chk => !chk.disabled);
      const aprobados = total.filter(chk => chk.checked);

      const barra = document.getElementById(`prog-sem${i}`);
      const pct = total.length ? Math.round((aprobados.length / total.length) * 100) : 0;
      if (barra) barra.style.width = `${pct}%`;
    }
  }

  // Inicializar
  semestres.forEach(s => malla.appendChild(crearSemestre(s)));
  actualizarEstados();
  actualizarProgreso();
});
