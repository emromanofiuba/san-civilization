import { Router } from "express";
import { getAllEventos } from "../db/eventos.js";

export const endpointsEventos = Router();

endpointsEventos.get("/", async (req, res) => {
    const eventos = await getAllEventos();
    res.json(eventos);
});
