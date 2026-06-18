async function getSociedad() {

    let params = new URL(document.location.toString()).searchParams;
    const id = params.get('id');

    const url = `http://localhost:8000/api/v1/sociedades/${id}`;
    const response = await fetch(url);
    
    if (response.status == 404){
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

getSociedad();
