async function getAllSociedades() {
    const url = `http://localhost:8000/api/v1/sociedades`;
    const response = await fetch(url);
    const sociedades = await response.json();

    const tableSociedades = document.getElementById("table-sociedades");
    tableSociedades.innerHTML = '';
    const error = document.getElementById("error");
    error.innerHTML = '';
    
    sociedades.forEach(sociedad => {
        const row = document.createElement("tr");

        const rowId = document.createElement("th");
        const rowNombre = document.createElement("td");
        const rowAcciones = document.createElement("td");
        rowAcciones.className = "acciones has-text-right";

        rowId.textContent = sociedad.id;
        rowNombre.textContent = sociedad.nombre;

        const grupoBotones = document.createElement("div");
        grupoBotones.className = "buttons is-right";

        const botonVer = document.createElement("a");
        botonVer.className = "button is-small is-info is-light";
        botonVer.innerHTML = '<span class="icon"><i class="fas fa-eye"></i></span><span>Ver</span>';
        botonVer.href = `sociedad.html?id=${sociedad.id}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "button is-small is-danger is-light";
        botonEliminar.innerHTML = '<span class="icon"><i class="fas fa-trash"></i></span><span>Eliminar</span>';
        botonEliminar.addEventListener('click', () => {
            deleteSociedad(sociedad.id);
        });

        grupoBotones.appendChild(botonVer);
        grupoBotones.appendChild(botonEliminar);
        rowAcciones.appendChild(grupoBotones);

        row.appendChild(rowId);
        row.appendChild(rowNombre);
        row.appendChild(rowAcciones);

        tableSociedades.appendChild(row);
    });
}

async function deleteSociedad(id){
    const response = await fetch(`http://localhost:8000/api/v1/sociedades`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    });

    if (response.status == 200) {
        await getAllSociedades();
    } else {
        const error = document.getElementById("error");
        error.textContent = response.statusText;
    }
}

async function getSociedad() {

    let params = new URL(document.location.toString()).searchParams;
    const id = params.get('id');

    const url = `http://localhost:8000/api/v1/sociedades/${id}`;
    const response = await fetch(url);

    if (response.status == 404) {
        const sociedadData = document.getElementById("sociedad-data");
        sociedadData.innerHTML = "La sociedad buscada no existe";
        return;
    }

    const sociedad = await response.json();

    const sociedadId = document.getElementById("sociedad-id");
    sociedadId.textContent = sociedad.id;

    const sociedadNombre = document.getElementById("sociedad-nombre");
    sociedadNombre.textContent = sociedad.nombre;
}

async function nuevaSociedad() {
    const error = document.getElementById("error");
    error.textContent = "";

    const nombre = document.getElementById("sociedad-nombre");

    if (nombre.value == "") {
        error.textContent = "El nombre no puede estar vacío";
    }

    const response = await fetch(`http://localhost:8000/api/v1/sociedades`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre.value
        })
    });

    if (response.status == 201) {
        window.location.href = "http://localhost:8080/sociedades.html";
    } else {
        const error = document.getElementById("error");
        error.textContent = response.statusText;
    }
}
