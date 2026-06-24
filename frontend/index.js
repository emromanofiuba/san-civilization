const API = "http://localhost:8000/api/v1";

// Paleta para distinguir sociedades en el gráfico y las cards
const COLORES = [
    "#3273dc", "#48c774", "#ff3860", "#ffdd57",
    "#9b59b6", "#1abc9c", "#e67e22", "#34495e",
];

// Estado global del dashboard
let sociedades = [];      // [{ id, nombre, color, anios: [], porAnio: Map(anio -> Map(grupo -> cantidad)) }]
let aniosGlobales = [];   // años únicos ordenados (unión de todas las sociedades)
let anioObservado = null; // año que se está mostrando en las cards / animación
let grafico = null;
let intervaloAnimacion = null;

function colorPara(indice) {
    return COLORES[indice % COLORES.length];
}

function totalDeAnio(porAnio, anio) {
    const grupos = porAnio.get(anio);
    if (!grupos) return null;
    let total = 0;
    for (const cantidad of grupos.values()) total += cantidad;
    return total;
}

// El año "vigente" para una sociedad dado el año observado: el último año con
// datos que sea <= al observado (así la animación se ve continua).
function anioVigente(sociedad, anio) {
    let vigente = null;
    for (const a of sociedad.anios) {
        if (a <= anio) vigente = a; else break;
    }
    return vigente;
}

async function cargarDatos() {
    const [resSociedades, resRegistros] = await Promise.all([
        fetch(`${API}/sociedades`),
        fetch(`${API}/registros-historicos`),
    ]);
    const listaSociedades = await resSociedades.json();
    const registros = await resRegistros.json();

    // Agrupar registros por sociedad y por año
    const porSociedad = new Map();
    for (const soc of listaSociedades) {
        porSociedad.set(soc.id, {
            id: soc.id,
            nombre: soc.nombre,
            anios: new Set(),
            porAnio: new Map(), // anio -> Map(grupoNombre -> cantidad)
        });
    }

    for (const reg of registros) {
        const soc = porSociedad.get(reg.sociedad_id);
        if (!soc) continue;
        soc.anios.add(reg.anio);
        if (!soc.porAnio.has(reg.anio)) soc.porAnio.set(reg.anio, new Map());
        soc.porAnio.get(reg.anio).set(reg.grupo_etario, reg.cantidad);
    }

    const aniosSet = new Set();
    sociedades = [];
    let i = 0;
    for (const soc of porSociedad.values()) {
        soc.anios = [...soc.anios].sort((a, b) => a - b);
        soc.color = colorPara(i++);
        soc.anios.forEach(a => aniosSet.add(a));
        sociedades.push(soc);
    }
    aniosGlobales = [...aniosSet].sort((a, b) => a - b);
}

function renderCards() {
    const contenedor = document.querySelector("#cards-sociedades .grid");
    contenedor.innerHTML = "";

    if (sociedades.length === 0) {
        contenedor.innerHTML = '<div class="cell"><p>No hay sociedades todavía.</p></div>';
        return;
    }

    for (const soc of sociedades) {
        const anio = anioVigente(soc, anioObservado);

        const cell = document.createElement("div");
        cell.className = "cell";

        if (anio === null) {
            cell.innerHTML = `
                <div class="card">
                    <div class="card-content">
                        <p class="title is-5">${soc.nombre}</p>
                        <p class="has-text-grey">Sin datos para este año.</p>
                    </div>
                </div>`;
            contenedor.appendChild(cell);
            continue;
        }

        const total = totalDeAnio(soc.porAnio, anio);

        // Tendencia: comparar con el año anterior que tenga datos
        const idxAnio = soc.anios.indexOf(anio);
        let tendencia = "";
        if (idxAnio > 0) {
            const totalPrevio = totalDeAnio(soc.porAnio, soc.anios[idxAnio - 1]);
            if (total > totalPrevio) tendencia = '<span class="tag is-success">▲ subió</span>';
            else if (total < totalPrevio) tendencia = '<span class="tag is-danger">▼ bajó</span>';
            else tendencia = '<span class="tag is-light">= igual</span>';
        }

        // Desglose por grupo etario con mini barras
        const grupos = soc.porAnio.get(anio);
        const maxGrupo = Math.max(1, ...grupos.values());
        let desglose = "";
        for (const [grupo, cantidad] of grupos) {
            const ancho = Math.round((cantidad / maxGrupo) * 100);
            desglose += `
                <div class="mb-2">
                    <div class="is-flex is-justify-content-space-between is-size-7">
                        <span>${grupo}</span><strong>${cantidad}</strong>
                    </div>
                    <progress class="progress is-small" value="${ancho}" max="100"
                        style="accent-color: ${soc.color};">${ancho}%</progress>
                </div>`;
        }

        cell.innerHTML = `
            <div class="card" style="border-top: 4px solid ${soc.color};">
                <div class="card-content">
                    <div class="is-flex is-justify-content-space-between is-align-items-center mb-2">
                        <p class="title is-5 mb-0">${soc.nombre}</p>
                        ${tendencia}
                    </div>
                    <p class="heading">Año ${anio} · Población total</p>
                    <p class="title is-3" style="color: ${soc.color};">${total.toLocaleString("es-AR")}</p>
                    <hr class="my-2">
                    ${desglose}
                </div>
            </div>`;
        contenedor.appendChild(cell);
    }
}

function renderGrafico() {
    const ctx = document.getElementById("grafico-progresion");

    const datasets = sociedades.map(soc => ({
        label: soc.nombre,
        data: aniosGlobales.map(a => totalDeAnio(soc.porAnio, a)),
        borderColor: soc.color,
        backgroundColor: soc.color,
        tension: 0.25,
        spanGaps: true,
    }));

    if (grafico) {
        grafico.data.labels = aniosGlobales;
        grafico.data.datasets = datasets;
        grafico.update();
        return;
    }

    grafico = new Chart(ctx, {
        type: "line",
        data: { labels: aniosGlobales, datasets },
        options: {
            responsive: true,
            interaction: { mode: "index", intersect: false },
            scales: {
                x: { title: { display: true, text: "Año" } },
                y: { title: { display: true, text: "Población" }, beginAtZero: true },
            },
        },
    });
}

function actualizarEtiquetasAnio() {
    document.getElementById("anio-observado").textContent = anioObservado ?? "—";
    document.getElementById("anio-animacion").textContent = anioObservado ?? "—";
}

function configurarSlider() {
    const slider = document.getElementById("slider-anio");
    if (aniosGlobales.length === 0) {
        slider.max = 0;
        slider.value = 0;
        return;
    }
    slider.min = 0;
    slider.max = aniosGlobales.length - 1;
    // Mantener el año observado si sigue existiendo; si no, ir al último
    const idx = aniosGlobales.indexOf(anioObservado);
    slider.value = idx >= 0 ? idx : aniosGlobales.length - 1;
    anioObservado = aniosGlobales[slider.value];
}

function renderTodo() {
    actualizarEtiquetasAnio();
    renderCards();
    renderGrafico();
}

async function recargar() {
    await cargarDatos();
    // Por defecto observamos el último año disponible
    if (anioObservado === null || !aniosGlobales.includes(anioObservado)) {
        anioObservado = aniosGlobales.length ? aniosGlobales[aniosGlobales.length - 1] : null;
    }
    configurarSlider();
    renderTodo();
}

async function avanzarAnios() {
    const error = document.getElementById("error");
    error.textContent = "";

    const input = document.getElementById("anios-a-avanzar");
    const anios = Math.max(1, parseInt(input.value, 10) || 1);

    const boton = document.getElementById("boton-avanzar");
    boton.classList.add("is-loading");

    try {
        const response = await fetch(`${API}/simular`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ anios }),
        });

        if (!response.ok) {
            error.textContent = `Error al avanzar: ${response.statusText}`;
            return;
        }

        // Saltar al año más nuevo para ver el resultado del avance
        anioObservado = null;
        await recargar();
    } catch (e) {
        error.textContent = `No se pudo conectar con el backend: ${e.message}`;
    } finally {
        boton.classList.remove("is-loading");
    }
}

function alMoverSlider() {
    const slider = document.getElementById("slider-anio");
    anioObservado = aniosGlobales[slider.value];
    actualizarEtiquetasAnio();
    renderCards();
}

function toggleAnimacion() {
    const boton = document.getElementById("boton-play");
    const slider = document.getElementById("slider-anio");

    if (intervaloAnimacion) {
        detenerAnimacion();
        return;
    }

    if (aniosGlobales.length <= 1) return;

    boton.textContent = "⏸ Pausar";

    // Si está al final, reiniciar desde el principio
    if (Number(slider.value) >= Number(slider.max)) {
        slider.value = 0;
        alMoverSlider();
    }

    intervaloAnimacion = setInterval(() => {
        if (Number(slider.value) >= Number(slider.max)) {
            detenerAnimacion();
            return;
        }
        slider.value = Number(slider.value) + 1;
        alMoverSlider();
    }, 700);
}

function detenerAnimacion() {
    clearInterval(intervaloAnimacion);
    intervaloAnimacion = null;
    document.getElementById("boton-play").textContent = "▶ Reproducir";
}

async function iniciarDashboard() {
    document.getElementById("boton-avanzar").addEventListener("click", avanzarAnios);
    document.getElementById("slider-anio").addEventListener("input", () => {
        detenerAnimacion();
        alMoverSlider();
    });
    document.getElementById("boton-play").addEventListener("click", toggleAnimacion);

    await recargar();
}
