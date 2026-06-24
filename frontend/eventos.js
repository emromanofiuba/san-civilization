async function getAllEventos() {
    const url = `http://localhost:8000/api/v1/eventos`;
    const response = await fetch(url);
    const eventos = await response.json();

    const tableEventos = document.getElementById("table-eventos");
    tableEventos.innerHTML = '';
    const error = document.getElementById("error");
    error.innerHTML = '';

    eventos.forEach(evento => {
        const row = document.createElement("tr");

        const rowId = document.createElement("th");
        const rowNombre = document.createElement("td");
        const rowGrupoEtario = document.createElement("td");
        const rowAnioDesde = document.createElement("td");
        const rowAnioHasta = document.createElement("td");
        const rowNatalidad = document.createElement("td");
        const rowMortalidad = document.createElement("td");
        const rowAcciones = document.createElement("td");
        rowAcciones.className = "acciones has-text-right";

        rowId.textContent = evento.id;
        rowNombre.textContent = evento.nombre;
        rowGrupoEtario.textContent = evento.grupo_etario;
        rowAnioDesde.textContent = evento.anio_desde;
        rowAnioHasta.textContent = evento.anio_hasta;
        rowNatalidad.textContent = evento.natalidad;
        rowMortalidad.textContent = evento.mortalidad;
        rowAnioDesde.className = "has-text-right";
        rowAnioHasta.className = "has-text-right";
        rowNatalidad.className = "has-text-right";
        rowMortalidad.className = "has-text-right";

        const grupoBotones = document.createElement("div");
        grupoBotones.className = "buttons is-right";

        const botonVer = document.createElement("a");
        botonVer.className = "button is-small is-info is-light";
        botonVer.innerHTML = '<span class="icon"><i class="fas fa-eye"></i></span><span>Ver</span>';
        botonVer.href = `evento.html?id=${evento.id}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "button is-small is-danger is-light";
        botonEliminar.innerHTML = '<span class="icon"><i class="fas fa-trash"></i></span><span>Eliminar</span>';
        botonEliminar.addEventListener('click', () => {
            deleteEvento(evento.id);
        });

        grupoBotones.appendChild(botonVer);
        grupoBotones.appendChild(botonEliminar);
        rowAcciones.appendChild(grupoBotones);

        row.appendChild(rowId);
        row.appendChild(rowNombre);
        row.appendChild(rowGrupoEtario);
        row.appendChild(rowAnioDesde);
        row.appendChild(rowAnioHasta);
        row.appendChild(rowNatalidad);
        row.appendChild(rowMortalidad);
        row.appendChild(rowAcciones);

        tableEventos.appendChild(row);
    });
}

async function deleteEvento(id){
    const response = await fetch(`http://localhost:8000/api/v1/eventos`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    });

    if (response.status == 200) {
        await getAllEventos();
    } else {
        const error = document.getElementById("error");
        error.textContent = response.statusText;
    }
}

async function getEvento() {

    let params = new URL(document.location.toString()).searchParams;
    const id = params.get('id');

    const url = `http://localhost:8000/api/v1/eventos/${id}`;
    const response = await fetch(url);

    if (response.status == 404) {
        const eventoData = document.getElementById("evento-data");
        eventoData.innerHTML = "El evento no existe";
        return;
    }

    const evento = await response.json();

    const eventoId = document.getElementById("evento-id");
    eventoId.textContent = evento.id;

    const eventoNombre = document.getElementById("evento-nombre");
    eventoNombre.textContent = evento.nombre;

    const eventoGrupoEtario = document.getElementById("evento-grupo-etario");
    eventoGrupoEtario.textContent = evento.grupo_etario;

    const eventoAnioDesde = document.getElementById("evento-anio-desde");
    eventoAnioDesde.textContent = evento.anio_desde;

    const eventoAnioHasta = document.getElementById("evento-anio-hasta");
    eventoAnioHasta.textContent = evento.anio_hasta;

    const eventoNatalidad = document.getElementById("evento-natalidad");
    eventoNatalidad.textContent = evento.natalidad;

    const eventoMortalidad = document.getElementById("evento-mortalidad");
    eventoMortalidad.textContent = evento.mortalidad;
}

async function nuevoEvento() {
    const error = document.getElementById("error");
    error.textContent = "";

    const nombre = document.getElementById("evento-nombre");
    const grupoEtario = document.getElementById("grupos-etarios-select");
    const anioDesde = document.getElementById("evento-anio-desde");
    const anioHasta = document.getElementById("evento-anio-hasta");
    const natalidad = document.getElementById("evento-natalidad");
    const mortalidad = document.getElementById("evento-mortalidad");

    if (nombre.value == "") {
        error.textContent = "El nombre no puede estar vacío";
        return
    }

    if (anioDesde.value == "") {
        error.textContent = "El año desde no puede estar vacío";
        return
    }

    if (anioHasta.value == "") {
        error.textContent = "El año hasta no puede estar vacío";
        return
    }

    if (natalidad.value == "") {
        error.textContent = "La natalidad no puede estar vacío";
        return
    }

    if (mortalidad.value == "") {
        error.textContent = "La mortalidad no puede estar vacío";
        return
    }

    const response = await fetch(`http://localhost:8000/api/v1/eventos`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre.value,
            grupoEtario: grupoEtario.value,
            anioDesde: anioDesde.value,
            anioHasta: anioHasta.value,
            natalidad: natalidad.value,
            mortalidad: mortalidad.value
        })
    });

    if (response.status == 201) {
        window.location.href = "http://localhost:8080/eventos.html";
    } else {
        const error = document.getElementById("error");
        error.textContent = response.statusText;
    }
}

async function popularGruposEtarios() {
    const url = `http://localhost:8000/api/v1/grupos-etarios`;
    const response = await fetch(url);
    const gruposEtarios = await response.json();

    const gruposEtariosSelect = document.getElementById("grupos-etarios-select");
    gruposEtarios.forEach(grupoEtario => {
        const option = document.createElement('option');
        option.textContent = `${grupoEtario.nombre} (${grupoEtario.sociedad})`;
        option.value = grupoEtario.id;

        gruposEtariosSelect.appendChild(option);
    });
}
