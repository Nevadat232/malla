const ramos = [
  {
    nombre: "Estrategias para el Aprendizaje",
    semestre: 1,
    id: "aprendizaje",
    abre: ["electivo1"]
  },
  {
    nombre: "Fundamentos Biológicos del Comportamiento",
    semestre: 1,
    id: "biologico",
    abre: ["neuro"]
  },
  {
    nombre: "Neuropsicología",
    semestre: 2,
    id: "neuro",
    requisitos: ["biologico"]
  },
  {
    nombre: "Electivo de Formación Integral I",
    semestre: 3,
    id: "electivo1",
    requisitos: ["aprendizaje"]
  },
  // Continúa agregando todos los demás ramos...
];

const estado = {}; // Para saber qué ramos están aprobados

function crearMalla() {
  const container = document.getElementById("malla-container");

  for (let s = 1; s <= 10; s++) {
    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";
    semestreDiv.innerHTML = <h2>Semestre ${s}</h2>;

    const ramosSemestre = ramos.filter(r => r.semestre === s);
    ramosSemestre.forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.id = ramo.id;
      div.innerText = ramo.nombre;
      div.dataset.requisitos = (ramo.requisitos || []).join(",");
      div.addEventListener("click", () => marcarAprobado(ramo.id));
      semestreDiv.appendChild(div);
    });

    container.appendChild(semestreDiv);
  }

  actualizarEstado();
}

function marcarAprobado(id) {
  estado[id] = !estado[id];
  actualizarEstado();
}

function actualizarEstado() {
  ramos.forEach(ramo => {
    const el = document.getElementById(ramo.id);
    const requisitos = ramo.requisitos || [];
    const cumplidos = requisitos.every(req => estado[req]);

    if (!cumplidos && requisitos.length > 0 && !estado[ramo.id]) {
      el.className = "ramo bloqueado";
    } else {
      el.className = "ramo";
      if (estado[ramo.id]) {
        el.classList.add("aprobado");
      }
    }
  });
}

crearMalla();
