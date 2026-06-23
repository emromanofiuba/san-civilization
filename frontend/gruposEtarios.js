async function getAllGruposEtarios() {
    const url = `http://localhost:8000/api/v1/grupos-etarios`;
    const response = await fetch(url);
    const gruposEtarios = await response.json();

    const tableGruposEtarios = document.getElementById("table-grupos-etarios");
    tableGruposEtarios.innerHTML = '';
    const error = document.getElementById("error");
    error.innerHTML = '';
    
    gruposEtarios.forEach(grupoEtario => {
        const row = document.createElement("tr");

        const rowId = document.createElement("th");
        const rowNombre = document.createElement("td");
        const rowSociedad = document.createElement("td");
        const rowNatalidadBase = document.createElement("td");
        const rowMortalidadBase = document.createElement("td");
        const rowAcciones = document.createElement("td");
        
        rowId.textContent = grupoEtario.id;
        rowNombre.textContent = grupoEtario.nombre;
        rowSociedad.textContent = grupoEtario.sociedad;
        rowNatalidadBase.textContent = grupoEtario.natalidad_base;
        rowMortalidadBase.textContent = grupoEtario.mortalidad_base;
        
        const botonVer = document.createElement("a");
        botonVer.className = "button is-small is-info";
        botonVer.textContent = "Ver";
        botonVer.href = `grupo-etario.html?id=${grupoEtario.id}`;

        const botonEditar = document.createElement("a");
        botonEditar.className = "button is-small is-warning";
        botonEditar.textContent = "Editar";

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "button is-small is-danger";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener('click', () => {
            deleteGrupoEtario(grupoEtario.id);
        });

        rowAcciones.appendChild(botonVer);
        rowAcciones.appendChild(botonEditar);
        rowAcciones.appendChild(botonEliminar);

        row.appendChild(rowId);
        row.appendChild(rowNombre);
        row.appendChild(rowSociedad);
        row.appendChild(rowNatalidadBase);
        row.appendChild(rowMortalidadBase);
        row.appendChild(rowAcciones);

        tableGruposEtarios.appendChild(row);
    });
}

async function deleteGrupoEtario(id){
    const response = await fetch(`http://localhost:8000/api/v1/grupos-etarios`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    });

    if (response.status == 200) {
        await getAllGruposEtarios();
    } else {
        const error = document.getElementById("error");
        error.textContent = response.statusText;
    }
}

async function getGrupoEtario() {

    let params = new URL(document.location.toString()).searchParams;
    const id = params.get('id');

    const url = `http://localhost:8000/api/v1/grupos-etarios/${id}`;
    const response = await fetch(url);

    if (response.status == 404) {
        const grupoEtarioData = document.getElementById("grupo-etario-data");
        grupoEtarioData.innerHTML = "El grupo etario no existe";
        return;
    }

    const grupoEtario = await response.json();

    const grupoEtarioId = document.getElementById("grupo-etario-id");
    grupoEtarioId.textContent = grupoEtario.id;

    const grupoEtarioNombre = document.getElementById("grupo-etario-nombre");
    grupoEtarioNombre.textContent = grupoEtario.nombre;

    const grupoEtarioSociedad = document.getElementById("grupo-etario-sociedad");
    grupoEtarioSociedad.textContent = grupoEtario.sociedad;

    const grupoEtarioNatalidadBase = document.getElementById("grupo-etario-natalidad-base");
    grupoEtarioNatalidadBase.textContent = grupoEtario.natalidad_base;

    const grupoEtarioMortalidadBase = document.getElementById("grupo-etario-mortalidad-base");
    grupoEtarioMortalidadBase.textContent = grupoEtario.mortalidad_base;
}

async function nuevoGrupoEtario() {
    const error = document.getElementById("error");
    error.textContent = "";

    const nombre = document.getElementById("grupo-etario-nombre");
    const sociedadId = document.getElementById("sociedades-select");
    const natalidadBase = document.getElementById("grupo-etario-natalidad-base");
    const mortalidadBase = document.getElementById("grupo-etario-mortalidad-base");

    if (nombre.value == "") {
        error.textContent = "El nombre no puede estar vacío";
        return
    }

    if (natalidadBase.value == "") {
        error.textContent = "La natalidad base no puede estar vacío";
        return
    }

    if (mortalidadBase.value == "") {
        error.textContent = "La mortalidad base no puede estar vacío";
        return
    }

    const response = await fetch(`http://localhost:8000/api/v1/grupos-etarios`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre.value,
            sociedadId: sociedadId.value,
            natalidadBase: natalidadBase.value,
            mortalidadBase: mortalidadBase.value
        })
    });

    if (response.status == 201) {
        window.location.href = "http://localhost:8080/grupos-etarios.html";
    } else {
        const error = document.getElementById("error");
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
