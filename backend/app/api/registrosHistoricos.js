import { Router } from "express";
import { getAllRegistrosHistoricos, getOneRegistroHistorico, createRegistroHistorico } from "../db/registrosHistoricos.js";

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
