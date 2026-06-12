import { Router } from "express";
import { getAllEventos, getOneEvento, createEvento } from "../db/eventos.js";

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

endpointsEventos.post("/", async (req, res) => {
    const created = await createEvento(
        req.body.nombre,
        req.body.grupoEtario,
        req.body.anioDesde,
        req.body.anioHasta,
        req.body.natalidad,
        req.body.mortalidad
    );

    if (!created) {
        res.sendStatus(500);
        return;
    }

    res.status(201).json({message: "Evento creado"});
})
