import {Router} from "express"; 

import { productsRoutes } from "./productsRoutes";
import { tableRoutes } from "./tableRoutes"; 
import {tableSessionsRoutes} from "./tablesSessionsRoutes"; 
import { ordersRoutes } from "./ordersRoutes";

const routes = Router(); 

routes.use("/products", productsRoutes);
routes.use("/tables", tableRoutes); 
routes.use("/tables-sessions", tableSessionsRoutes); 
routes.use("/orders", ordersRoutes)



export { routes }; 

