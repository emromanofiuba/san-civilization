import { Router } from "express";
import { getAllSociedades, getOneSociedad } from "../db/sociedades.js";

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
