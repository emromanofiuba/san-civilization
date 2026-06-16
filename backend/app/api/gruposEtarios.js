import { Router } from "express";
import { getAllGruposEtarios, getOneGrupoEtario, createGrupoEtario } from "../db/gruposEtarios.js";

export const endpointsGruposEtarios = Router();

endpointsGruposEtarios.get("/", async (req, res) => {
    const gruposEtarios = await getAllGruposEtarios();
    res.json(gruposEtarios);
});

endpointsGruposEtarios.get("/:id", async (req, res) => {
    let id = req.params.id;

    const grupoEtario = await getOneGrupoEtario(id);

    if (grupoEtario === undefined) {
        res.sendStatus(404);
        return;
    }

    res.json(grupoEtario);
});

/*
 * curl -X POST -d '{"nombre":"jovenes","sociedad":1,"natalidadBase":10,"mortalidadBase":5}' -H "Content-Type: application/json" http://localhost:8000/api/v1/grupos-etarios
 */
endpointsGruposEtarios.post("/", async (req, res) => {
    const created = await createGrupoEtario(
        req.body.nombre, req.body.sociedad, req.body.natalidadBase, req.body.mortalidadBase
    );

    if (!created) {
        res.sendStatus(500);
        return;
    }

    res.status(201).json({message: "Grupo Etario creado"});
})
