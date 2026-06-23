async function getAllRegistrosHistoricos() {
    const url = `http://localhost:8000/api/v1/registros-historicos`;
    const response = await fetch(url);
    const registrosHistoricos = await response.json();

    const tableRegistrosHistoricos = document.getElementById("table-registros-historicos");
    tableRegistrosHistoricos.innerHTML = '';
    const error = document.getElementById("error");
    error.innerHTML = '';

    registrosHistoricos.forEach(registroHistorico => {
        const row = document.createElement("tr");

        const rowId = document.createElement("th");
        const rowSociedad = document.createElement("td");
        const rowGrupoEtario = document.createElement("td");
        const rowAnio = document.createElement("td");
        const rowCantidad = document.createElement("td");

        rowId.textContent = registroHistorico.id;
        rowSociedad.textContent = registroHistorico.sociedad;
        rowGrupoEtario.textContent = registroHistorico.grupo_etario;
        rowAnio.textContent = registroHistorico.anio;
        rowCantidad.textContent = registroHistorico.cantidad;

        row.appendChild(rowId);
        row.appendChild(rowSociedad);
        row.appendChild(rowGrupoEtario);
        row.appendChild(rowAnio);
        row.appendChild(rowCantidad);

        tableRegistrosHistoricos.appendChild(row);
    });
}

async function iniciarSociedad() {
    const error = document.getElementById("error");
    error.textContent = "";

    const sociedad = document.getElementById("sociedades-select");
    const anio = document.getElementById("anio-inicio");

    if (anio.value == "") {
        error.textContent = "El año de inicio no puede estar vacío";
        return
    }

    const response = await fetch(`http://localhost:8000/api/v1/registros-historicos/iniciar`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sociedad: sociedad.value,
            anio: anio.value
        })
    });

    if (response.status == 201) {
        window.location.href = "http://localhost:8080/registros-historicos.html";
    } else {
        error.textContent = response.statusText;
    }
}

async function popularSociedades() {
    const url = `http://localhost:8000/api/v1/sociedades`;
    const response = await fetch(url);
    const sociedades = await response.json();

    const sociedadesSelect = document.getElementById("sociedades-select");
    sociedades.forEach(sociedad => {
        const option = document.createElement('option');
        option.textContent = sociedad.nombre;
        option.value = sociedad.id;

        sociedadesSelect.appendChild(option);
    });
}
