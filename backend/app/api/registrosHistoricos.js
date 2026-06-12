import { Router } from "express";
import { getAllRegistrosHistoricos } from "../db/registrosHistoricos.js";

export const endpointsRegistrosHistoricos = Router();

endpointsRegistrosHistoricos.get("/", async (req, res) => {
    const registrosHistoricos = await getAllRegistrosHistoricos();
    res.json(registrosHistoricos);
});
