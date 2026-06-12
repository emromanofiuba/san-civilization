import { Router } from "express";
import { getAllRegistrosHistoricos, getOneRegistroHistorico } from "../db/registrosHistoricos.js";

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
