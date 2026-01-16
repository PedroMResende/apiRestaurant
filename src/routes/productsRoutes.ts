import { productController } from "@/controllers/productsController";
import {Router} from "express"; 


const productsRoutes = Router(); 
const productsController = new productController(); 

productsRoutes.get("/", productsController.list);

productsRoutes.post("/", productsController.create); 

productsRoutes.put("/:id", productsController.find, productsController.update); 

productsRoutes.delete("/:id", productsController.find, productsController.remove); 


export { productsRoutes }; 

