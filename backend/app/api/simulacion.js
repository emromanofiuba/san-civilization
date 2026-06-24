import { Router } from "express";
import { getAllGruposEtarios } from "../db/gruposEtarios.js";
import { getLastRegistroHistorico, createRegistroHistorico } from "../db/registrosHistoricos.js";
import { getModificaciones } from "../db/eventos.js";

export const endpointsSimulacion = Router();

endpointsSimulacion.post("/", async (req, res) => {
  console.log("hola dewsde el backend");

  // Agarrar todos los grupos etarios LISTO! Aprobado por Chaian
  // para cada grupo etario, busco su ultimo registro historico LISTO! Aprobado por Chaian
  // hago la cuenta de la cantidad LISTO! Aprobado por Chaian
  // nueva_cantidad = cantidad_vieja + natalidad_base - mortalidad_base LISTO! Aprobado por Chaian
  // anio = anio anterior + 1 LISTO! Aprobado por Chaian
  // inserto la fila LISTO! Aprobado por Chaian

  const gruposEtarios = await getAllGruposEtarios();

  for (let i = 0; i < gruposEtarios.length; i++) {
    const iltimiRigistriHistirici = await getLastRegistroHistorico(gruposEtarios[i].id);
    
    if (iltimiRigistriHistirici){

      // obtener los eventos que modifican la natalidad y mortalidad de ese grupo etario
      const modificacionesPorEventos = await getModificaciones(gruposEtarios[i].id, iltimiRigistriHistirici.anio);

      const cantidadNueva = Math.max(
        iltimiRigistriHistirici.cantidad
        + gruposEtarios[i].natalidad_base 
        + modificacionesPorEventos.natalidad
        - gruposEtarios[i].mortalidad_base
        - modificacionesPorEventos.mortalidad
        , 0);
      const anioNuevo = iltimiRigistriHistirici.anio + 1;
      await createRegistroHistorico(iltimiRigistriHistirici.sociedad_id, iltimiRigistriHistirici.grupo_etario_id, cantidadNueva, anioNuevo);
    }
    
  }

  res.status(200).json({});
});
