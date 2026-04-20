let registros = JSON.parse(localStorage.getItem("registros")) || [];

function guardar() {
  localStorage.setItem("registros", JSON.stringify(registros));
}

function obtenerSolucion(tipo, problema) {
  problema = problema.toLowerCase();

  if (tipo === "hardware") {
    if (problema.includes("no enciende")) {
      return "Revisar fuente de poder o cableado.";
    }
    if (problema.includes("ruido")) {
      return "Revisar ventiladores o disco duro.";
    }
    return "Revisar componentes internos.";
  }

  if (tipo === "software") {
    if (problema.includes("lento")) {
      return "Eliminar archivos basura o escanear virus.";
    }
    if (problema.includes("virus")) {
      return "Ejecutar antivirus.";
    }
    return "Reinstalar programa o sistema.";
  }

  return "No se pudo determinar.";
}

function diagnosticar() {
  const equipo = document.getElementById("equipo").value;
  const tecnico = document.getElementById("tecnico").value;
  const tipo = document.getElementById("tipo").value;
  const problema = document.getElementById("problema").value;

  if (!equipo || !tecnico || !tipo || !problema) {
    alert("Llena todos los campos");
    return;
  }

  const solucion = obtenerSolucion(tipo, problema);

  const fecha = new Date().toLocaleString();

  const nuevo = {
    equipo,
    tecnico,
    tipo,
    problema,
    solucion,
    fecha
  };

  registros.push(nuevo);
  guardar();
  mostrar();

  document.getElementById("equipo").value = "";
  document.getElementById("tecnico").value = "";
  document.getElementById("problema").value = "";
}

function eliminar(index) {
  registros.splice(index, 1);
  guardar();
  mostrar();
}

function mostrar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  registros.forEach((r, i) => {
    lista.innerHTML += `
      <div class="card">
        <p><strong>Equipo:</strong> ${r.equipo}</p>
        <p><strong>Técnico:</strong> ${r.tecnico}</p>
        <p><strong>Tipo:</strong> ${r.tipo}</p>
        <p><strong>Problema:</strong> ${r.problema}</p>
        <p><strong>Solución:</strong> ${r.solucion}</p>
        <p><strong>Fecha:</strong> ${r.fecha}</p>
        <button onclick="eliminar(${i})">Eliminar</button>
      </div>
    `;
  });
}

mostrar();