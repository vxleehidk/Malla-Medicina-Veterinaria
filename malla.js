document.addEventListener("DOMContentLoaded", () => {
  const malla = document.getElementById("malla");
  const info = document.getElementById("info");

  // Definición de semestres y ramos
  const semestres = [
    {
      id: 1,
      nombre: "Primer semestre",
      ramos: [
        { id: "au1", nombre: "Bases moleculares" },
        { id: "mmi001", nombre: "Introducción al manejo de la información" },
        { id: "du10", nombre: "Métodos de cuantificación" },
        { id: "cu7", nombre: "Diversidad animal" },
        { id: "omv001", nombre: "Orientación a la medicina veterinaria" }
      ]
    },
    {
      id: 2,
      nombre: "Segundo semestre",
      ramos: [
        { id: "au3", nombre: "Bases celulares", requisitos: ["au1"] },
        { id: "sem_a", nombre: "Seminario espacio" },
        { id: "au2", nombre: "Bases moleculares y celulares", requisitos: ["au1"] },
        { id: "bu4", nombre: "Histología" },
        { id: "bu5", nombre: "Anatomía" },
        { id: "cu8", nombre: "Ecología", requisitos: ["cu7"] },
        { id: "du11", nombre: "Bioestadística", requisitos: ["mmi001", "du10"] }
      ]
    },
    {
      id: 3,
      nombre: "Tercer semestre",
      ramos: [
        { id: "bu4", nombre: "Histología" },
        { id: "bu5", nombre: "Anatomía" },
        { id: "eu13", nombre: "Fisiología I", requisitos: ["au3", "au2"] },
        { id: "cu9", nombre: "Conducta Animal", requisitos: ["cu8"] },
        { id: "du12", nombre: "Epidemiología General", requisitos: ["du11"] },
        { id: "gu18_19", nombre: "Economía" }
      ]
    },
    {
      id: 4,
      nombre: "Cuarto semestre",
      ramos: [
        { id: "maep", nombre: "Ecología de poblaciones", requisitos: ["cu8"] },
        { id: "bu6", nombre: "Bases inmunológicas", requisitos: ["au2"] },
        { id: "eu14", nombre: "Fisiología II", requisitos: ["eu13", "bu5"] },
        { id: "eu15", nombre: "Farmacología general", requisitos: ["eu13"] },
        { id: "fu16", nombre: "Agentes biológicos patógenos", requisitos: ["au3", "au2"] },
        { id: "iu24", nombre: "Introducción a la producción animal" },
        { id: "micb", nombre: "Módulo integrador ciclo básico", requisitos: [
          // requiere todo aprobado hasta 3er semestre:
          "au1", "mmi001", "du10", "cu7", "omv001", "au3", "sem_a", "au2",
          "bu4", "bu5", "cu8", "du11", "eu13", "cu9", "du12", "gu18_19"
        ] }
      ]
    },
    {
      id: 5,
      nombre: "Quinto semestre",
      ramos: [
        { id: "maig", nombre: "Manipulación de información genética", requisitos: ["du11"] },
        { id: "fu17", nombre: "Enfermedades infecciosas y parasitarias", requisitos: ["fu16", "du12"] },
        { id: "hu20", nombre: "Patología I", requisitos: ["bu6", "eu14"] },
        { id: "iu26", nombre: "Nutrición", requisitos: ["eu14", "iu24"] },
        { id: "ju30", nombre: "Bases tecnológicas diagnósticas", requisitos: ["fu16", "bu6"] }
      ]
    },
    {
      id: 6,
      nombre: "Sexto semestre",
      ramos: [
        { id: "maat", nombre: "Anatomía topográfica", requisitos: ["bu5"] },
        { id: "hu21", nombre: "Patología II", requisitos: ["hu20"] },
        { id: "iu25", nombre: "Genética básica", requisitos: ["maig"] },
        { id: "iu27", nombre: "Alimentación", requisitos: ["iu26"] },
        { id: "ju31", nombre: "Métodos de exploración clínica", requisitos: ["hu20", "ju30"] }
      ]
    },
    {
      id: 7,
      nombre: "Séptimo semestre",
      ramos: [
        { id: "maca", nombre: "Conducta aplicada", requisitos: ["iu24", "cu9"] },
        { id: "hu22", nombre: "Patología III", requisitos: ["hu21"] },
        { id: "hu23", nombre: "Hematología: Patología diagnóstica", requisitos: ["hu21"] },
        { id: "iu28", nombre: "Reproducción", requisitos: ["hu21", "iu25"] },
        { id: "iu29", nombre: "Biotecnología reproductiva", requisitos: ["iu25", "hu21"] },
        { id: "mu38", nombre: "Medicina I", requisitos: ["ju31", "hu21"] },
        { id: "ku32", nombre: "Salud Pública Veterinaria", requisitos: ["fu17"] }
      ]
    },
    {
      id: 8,
      nombre: "Octavo semestre",
      ramos: [
        { id: "maplan", nombre: "Planificación", requisitos: ["gu18_19"] },
        { id: "ku33", nombre: "Gestión Ambiental", requisitos: ["ku32"] },
        { id: "ku34", nombre: "Inocuidad de alimentos", requisitos: ["ku32"] },
        { id: "lu36_i", nombre: "Manejo productivo", requisitos: ["iu27", "iu28"] },
        { id: "lu43", nombre: "Obstetricia, ginecología y manejo productivo", requisitos: ["iu28", "iu29"] },
        { id: "mu38", nombre: "Medicina I", requisitos: ["ju31", "hu21"] },
        { id: "micp", nombre: "Módulo integrador ciclo pre-profesional", requisitos: [
          // requiere todo aprobado hasta 7mo semestre
          "au1", "mmi001", "du10", "cu7", "omv001", "au3", "sem_a", "au2",
          "bu4", "bu5", "cu8", "du11", "eu13", "cu9", "du12", "gu18_19",
          "maep", "bu6", "eu14", "eu15", "fu16", "iu24", "micb",
          "maig", "fu17", "hu20", "iu26", "ju30",
          "maat", "hu21", "iu25", "iu27", "ju31",
          "maca", "hu22", "hu23", "iu28", "iu29", "mu38", "ku32"
        ]}
      ]
    },
    {
      id: 9,
      nombre: "Noveno semestre",
      ramos: [
        { id: "ku35", nombre: "Control y aseguramiento de la calidad de los alimentos", requisitos: ["ku34"] },
        { id: "lu36_ii", nombre: "Manejo productivo II", requisitos: ["iu28", "iu27"] },
        { id: "lu37", nombre: "Impacto ambiental", requisitos: ["ku33"] },
        { id: "mu39", nombre: "Medicina interna II", requisitos: ["mu38", "hu23"] },
        { id: "mu40", nombre: "Anestesiología y cirugía I", requisitos: ["hu23", "mu38"] },
        { id: "mu41", nombre: "Anestesiología y cirugía II", requisitos: ["hu23", "mu38"] },
        { id: "nu42", nombre: "Patología en explotaciones masivas", requisitos: ["fu17", "hu22"] },
        { id: "mabl", nombre: "Bases legislativas", requisitos: ["ku34"] }
      ]
    },
    {
      id: 10,
      nombre: "Décimo semestre",
      ramos: [
        { id: "internado_mv", nombre: "Internado de medicina veterinaria", requisitos: [] }, // Requiere todo aprobado
        { id: "internado_mp", nombre: "Internado de medicina preventiva", requisitos: [] },
        { id: "internado_pa", nombre: "Internado de producción animal", requisitos: [] },
        { id: "practica", nombre: "Práctica profesional", requisitos: [] }
      ]
    }
  ];

  // Para el último semestre, requeriremos todos los ramos anteriores aprobados
  // Creamos una lista con todos los IDs hasta el 9º semestre para usar como requisito del 10º
  const ramosHastaNoveno = semestres
    .slice(0, 9)
    .flatMap(s => s.ramos.map(r => r.id));

  // Actualizamos requisitos del décimo semestre
  semestres[9].ramos.forEach(ramo => {
    ramo.requisitos = ramosHastaNoveno;
  });

  // Función para crear asignatura
  function crearAsignatura(ramo) {
    const div = document.createElement("div");
    div.className = "asignatura";
    div.id = `a-${ramo.id}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = ramo.id;

    checkbox.addEventListener("change", () => {
      actualizarEstados();
      actualizarProgreso();
    });

    div.appendChild(checkbox);
    div.appendChild(document.createTextNode(ramo.nombre));
    div.addEventListener("click", () => mostrarInfo(ramo));

    return div;
  }

  // Función para crear semestre
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

    sem.ramos.forEach(ramo => {
      cont.appendChild(crearAsignatura(ramo));
    });

    return cont;
  }

  // Mostrar info de requisitos en el panel inferior
  function mostrarInfo(ramo) {
    if (!ramo.requisitos || ramo.requisitos.length === 0) {
      info.textContent = `${ramo.nombre} - Sin requisitos.`;
      return;
    }

    // Obtener nombres de requisitos
    const nombresReq = [];
    ramo.requisitos.forEach(reqId => {
      for (const semestre of semestres) {
        const r = semestre.ramos.find(r => r.id === reqId);
        if (r) {
          nombresReq.push(r.nombre);
          break;
        }
      }
    });

    info.textContent = `${ramo.nombre} requiere: ${nombresReq.join(", ")}`;
  }

  // Verifica si todos los requisitos están aprobados (checked)
  function requisitosCumplidos(requisitos) {
    if (!requisitos || requisitos.length === 0) return true;
    return requisitos.every(id => {
      const ch = document.getElementById(id);
      return ch && ch.checked;
    });
  }

  // Actualizar habilitación de checkboxes según requisitos
  function actualizarEstados() {
    for (const semestre of semestres) {
      for (const ramo of semestre.ramos) {
        const ch = document.getElementById(ramo.id);
        const div = document.getElementById(`a-${ramo.id}`);
        if (!ch || !div) continue;

        if (requisitosCumplidos(ramo.requisitos)) {
          ch.disabled = false;
          div.classList.remove("disabled");
        } else {
          ch.checked = false;
          ch.disabled = true;
          div.classList.add("disabled");
        }
      }
    }
  }

  // Actualizar barra de progreso por semestre
  function actualizarProgreso() {
    semestres.forEach(sem => {
      const cont = document.getElementById(`sem${sem.id}`);
      if (!cont) return;

      const checkboxes = cont.querySelectorAll("input[type=checkbox]");
      const habilitados = [...checkboxes].filter(ch => !ch.disabled);
      const aprobados = habilitados.filter(ch => ch.checked);

      const barra = document.getElementById(`prog-sem${sem.id}`);
      const porcentaje = habilitados.length === 0 ? 0 : Math.round((aprobados.length / habilitados.length) * 100);
      if (barra) barra.style.width = porcentaje + "%";
    });
  }

  // Iniciar la malla
  semestres.forEach(sem => {
    malla.appendChild(crearSemestre(sem));
  });
  actualizarEstados();
  actualizarProgreso();
});

