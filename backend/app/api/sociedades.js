import { Router } from "express";
import { getAllSociedades, getOneSociedad, createSociedad, deleteSociedad } from "../db/sociedades.js";

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

    // Hacer todas las validaciones!!

    const created = await createSociedad(
        req.body.nombre
    );

    if (!created) {
        res.sendStatus(500);
        return;
    }

    res.status(201).json({message: "Sociedad creada"});
})

endpointsSociedades.delete("/", async (req, res) => {

    // Chequear que la sociedad existe

    console.log(req.body);
    const deleted = await deleteSociedad(
        req.body.id
    );

    if (!deleted) {
        res.sendStatus(500);
        return;
    }

    res.status(200).json({ message: "Sociedad eliminada" });
})
