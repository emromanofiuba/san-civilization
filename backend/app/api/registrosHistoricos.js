import { Router } from "express";
import { getAllRegistrosHistoricos, getOneRegistroHistorico, createRegistroHistorico, iniciarSociedad } from "../db/registrosHistoricos.js";

export const endpointsRegistrosHistoricos = Router();

endpointsRegistrosHistoricos.get("/", async (req, res) => {
    const registrosHistoricos = await getAllRegistrosHistoricos();
    res.json(registrosHistoricos);
});

endpointsRegistrosHistoricos.get("/:id", async (req, res) => {
    let id = req.params.id;

    const registroHistorico = await getOneRegistroHistorico(id);

    if (registroHistorico === undefined) {
        res.sendStatus(404);
        return;
    }

    res.json(registroHistorico);
});

endpointsRegistrosHistoricos.post("/", async (req, res) => {
    const created = await createRegistroHistorico(
        req.body.sociedad, req.body.grupoEtario, req.body.cantidad, req.body.anio
    );

    if (!created) {
        res.sendStatus(500);
        return;
    }

    res.status(201).json({message: "Registro Historico creado"});
})

/*
 * Empieza una sociedad: crea un registro historico en cantidad 0 para cada grupo etario en el anio de inicio
 * curl -X POST -d '{"sociedad":1,"anio":0}' -H "Content-Type: application/json" http://localhost:8000/api/v1/registros-historicos/iniciar
 */
endpointsRegistrosHistoricos.post("/iniciar", async (req, res) => {
    const iniciada = await iniciarSociedad(
        req.body.sociedad, req.body.anio
    );

    if (!iniciada) {
        res.sendStatus(500);
        return;
    }

    res.status(201).json({message: "Sociedad iniciada"});
})
