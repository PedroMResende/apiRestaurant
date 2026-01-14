import { productController } from "@/controllers/productsController";
import {Router} from "express"; 


const productsRoutes = Router(); 
const productsController = new productController(); 

productsRoutes.get("/", productsController.index) ; 


export { productsRoutes }; 

