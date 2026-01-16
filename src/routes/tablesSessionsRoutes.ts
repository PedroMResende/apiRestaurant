import { Router } from "express";
import { tablesSessionsController } from "@/controllers/tablesSessionsController";

const tableSessionsRoutes = Router(); 
const tableSessionController = new tablesSessionsController(); 

tableSessionsRoutes.post("/", tableSessionController.create); 
tableSessionsRoutes.get("/", tableSessionController.list); 
tableSessionsRoutes.patch("/:id", tableSessionController.update); 

export {tableSessionsRoutes}; 