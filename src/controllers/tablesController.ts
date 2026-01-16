import {Request, Response, NextFunction} from "express"; 
import { AppError } from "@/utils/AppError";
import {knex} from "@/./database/knex"; 


class tablesController {

    async list(req: Request, res: Response, next: NextFunction) { 
        try { 
            console.log("PASSOU AQUI")
            const allTables = await knex<TableTable>("tables").select(); 

            return res.status(200).json(allTables); 
        } catch(err) { 
            next(err); 
        }
    }; 

    

}

export {tablesController}; 