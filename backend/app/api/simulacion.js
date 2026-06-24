import { Router } from "express";
import { getAllGruposEtarios } from "../db/gruposEtarios.js";
import { getLastRegistroHistorico, createRegistroHistorico } from "../db/registrosHistoricos.js";
import { getModificaciones } from "../db/eventos.js";

export const endpointsSimulacion = Router();

// Cota de seguridad para no encolar una simulacion infinita desde el frontend
const MAX_ANIOS_POR_REQUEST = 1000;

// Avanza un anio TODAS las sociedades: para cada grupo etario toma su ultimo
// registro historico y calcula la nueva cantidad de habitantes.
// nueva_cantidad = cantidad_vieja + natalidad_base + natalidad_eventos - mortalidad_base - mortalidad_eventos
async function avanzarUnAnio() {
  const gruposEtarios = await getAllGruposEtarios();

  for (let i = 0; i < gruposEtarios.length; i++) {
    const ultimoRegistro = await getLastRegistroHistorico(gruposEtarios[i].id);

    if (ultimoRegistro) {
      // obtener los eventos que modifican la natalidad y mortalidad de ese grupo etario
      const modificacionesPorEventos = await getModificaciones(gruposEtarios[i].id, ultimoRegistro.anio);

      const cantidadNueva = Math.max(
        ultimoRegistro.cantidad
        + gruposEtarios[i].natalidad_base
        + modificacionesPorEventos.natalidad
        - gruposEtarios[i].mortalidad_base
        - modificacionesPorEventos.mortalidad
        , 0);
      const anioNuevo = ultimoRegistro.anio + 1;
      await createRegistroHistorico(ultimoRegistro.sociedad_id, ultimoRegistro.grupo_etario_id, cantidadNueva, anioNuevo);
    }
  }
}

// POST / -> avanza la simulacion. Acepta {anios: N} para avanzar varios anios
// de una; si no se manda, avanza 1 anio (compatible con el comportamiento anterior).
endpointsSimulacion.post("/", async (req, res) => {
  const aniosPedidos = Number(req.body?.anios) || 1;
  const aniosAAvanzar = Math.max(1, Math.min(aniosPedidos, MAX_ANIOS_POR_REQUEST));

  for (let i = 0; i < aniosAAvanzar; i++) {
    await avanzarUnAnio();
  }

  res.status(200).json({ aniosAvanzados: aniosAAvanzar });
});
