import {Request, Response, NextFunction} from "express"; 
import { AppError } from "@/utils/AppError";

class productController { 
    
    
    
    
    async index(req: Request, res: Response, next: NextFunction) { 
        try {
            return res.status(200).json({msg: "OKAY"})
        } catch(err) { 
            next(err)
        }
    }
}

export {productController}; 