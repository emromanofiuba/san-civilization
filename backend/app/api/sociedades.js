import { Router } from "express";
import { getAllSociedades, getOneSociedad, createSociedad } from "../db/sociedades.js";

export const endpointsSociedades = Router();

endpointsSociedades.get("/", async (req, res) => {
    const sociedades = await getAllSociedades();
    res.json(sociedades);
});

endpointsSociedades.get("/:id", async (req, res) => {
    let id = req.params.id;

    const sociedad = await getOneSociedad(id);

    if (sociedad === undefined) {
        res.sendStatus(404);
        return;
    }

    res.json(sociedad);
});

/*
 * curl -X POST -d '{"nombre":"Liliputendes"}' -H "Content-Type: application/json" http://localhost:8000/api/v1/sociedades
 */
endpointsSociedades.post("/", async (req, res) => {
    const created = await createSociedad(
        req.body.nombre
    );

    if (!created) {
        res.sendStatus(500);
        return;
    }

    res.status(201).json({message: "Sociedad creada"});
})
