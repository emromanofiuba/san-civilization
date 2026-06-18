async function getAllSociedades() {
    const url = `http://localhost:8000/api/v1/sociedades`;
    const response = await fetch(url);
    const sociedades = await response.json();

    const tableSociedades = document.getElementById("table-sociedades");
    tableSociedades.innerHTML = '';
    
    sociedades.forEach(sociedad => {
        const row = document.createElement("tr");

        const rowId = document.createElement("th");
        const rowNombre = document.createElement("td");
        const rowAcciones = document.createElement("td");
        
        rowId.textContent = sociedad.id;
        rowNombre.textContent = sociedad.nombre;

        const botonVer = document.createElement("a");
        botonVer.className = "button is-small is-info";
        botonVer.textContent = "Ver";
        botonVer.href = `sociedad.html?id=${sociedad.id}`;
        // hacer algo con el href

        const botonEditar = document.createElement("a");
        botonEditar.className = "button is-small is-warning";
        botonEditar.textContent = "Editar";
        // hacer algo con el href

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "button is-small is-danger";
        botonEliminar.textContent = "Eliminar ";
        // hacer algo con el onclick

        rowAcciones.appendChild(botonVer);
        rowAcciones.appendChild(botonEditar);
        rowAcciones.appendChild(botonEliminar);

        row.appendChild(rowId);
        row.appendChild(rowNombre);
        row.appendChild(rowAcciones);

        tableSociedades.appendChild(row);
    });
}

getAllSociedades();
