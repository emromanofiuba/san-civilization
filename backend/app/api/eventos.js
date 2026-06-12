import { Router } from "express";
import { getAllEventos, getOneEvento } from "../db/eventos.js";

export const endpointsEventos = Router();

endpointsEventos.get("/", async (req, res) => {
    const eventos = await getAllEventos();
    res.json(eventos);
});

endpointsEventos.get("/:id", async (req, res) => {
    let id = req.params.id;

    const evento = await getOneEvento(id);

    if (evento === undefined) {
        res.sendStatus(404);
        return;
    }

    res.json(evento);
});
