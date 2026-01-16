import {Router} from "express"; 
import {ordersController} from "@/controllers/ordersController"; 

const ordersRoutes = Router(); 
const orderController = new ordersController(); 

ordersRoutes.post("/", orderController.create); 
ordersRoutes.get("/session-table/:table_session_id", orderController.list); 
ordersRoutes.get("/session-table/:table_session_id/total", orderController.show); 


export {ordersRoutes}; 

