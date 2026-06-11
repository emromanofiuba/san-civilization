import { Router } from "express";
import { getAllSociedades } from "../db/sociedades.js";

export const endpointsSociedades = Router();

endpointsSociedades.get("/", async (req, res) => {
    const sociedades = await getAllSociedades();
    res.json(sociedades);
});
