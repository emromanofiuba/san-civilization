import { Router } from "express";
import { getAllEventos, getOneEvento, createEvento, deleteEvento } from "../db/eventos.js";

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

/*
 * curl -X POST -d '{"nombre":"peste","grupoEtario":1,"anioDesde":100,"anioHasta":110,"natalidad":-5,"mortalidad":20}' -H "Content-Type: application/json" http://localhost:8000/api/v1/eventos
 */
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

endpointsEventos.delete("/", async (req, res) => {

    // Chequear que el evento existe

    console.log(req.body);
    const deleted = await deleteEvento(
        req.body.id
    );

    if (!deleted) {
        res.sendStatus(500);
        return;
    }

    res.status(200).json({ message: "Evento eliminado" });
})
