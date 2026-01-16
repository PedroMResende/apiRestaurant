import {Router} from "express"; 
import {tablesController} from "../controllers/tablesController"; 

const tableRoutes = Router(); 
const tableController = new tablesController(); 

tableRoutes.get("/", tableController.list); 


export {tableRoutes}

