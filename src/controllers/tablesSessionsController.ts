import {Request, Response , NextFunction} from "express" ; 
import {knex} from "../database/knex"; 
import {z} from "zod"; 
import { Tables } from "knex/types/tables";
import { AppError } from "@/utils/AppError";

class tablesSessionsController {




    async create(req: Request, res: Response, next: NextFunction) { 
        try { 
            const bodySchema = z.object({
                table_id: z.number()
            }); 

            const {table_id} = bodySchema.parse(req.body); 

            const sessionOpened = await knex<TableSessionsTable>("tables_sessions").select().where({table_id}).first(); 

            if(sessionOpened && !sessionOpened.closed_at) { 
                throw new AppError("This table is not closed!"); 
            }

            await knex<TableSessionsTable>("tables_sessions").insert({
                table_id, 
                opened_at : knex.fn.now()
            }); 

            const TableSessionFounded = await knex<TableSessionsTable>("tables_sessions").select().where({table_id:table_id}); 

            return res.status(201).json(TableSessionFounded);

        } catch(err) { 
            next(err); 
        }
    }; 

    async list(req: Request, res: Response, next: NextFunction) { 
        try{ 
            const sessionsFounded = await knex<TableSessionsTable>("tables_sessions").select().orderBy("closed_at"); 

            return res.status(200).json(sessionsFounded)
        } catch(err) { 
            next(err); 
        }
    }; 

    async update(req:Request, res: Response, next: NextFunction) { 
        try{
            const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), {message: "Id must be a number!"})
            .parse(req.params.id); 
            
            const sessionFounded = await knex<TableSessionsTable>("tables_sessions")
            .select().
            where({id}).
            first(); 

            if (!sessionFounded) { 
                throw new AppError("Session table not found", 404); 
            };

            if(sessionFounded.closed_at) { 
                throw new AppError("This session table is already closed")
            }; 

            await knex<TableSessionsTable>("tables_sessions")
            .update({
                closed_at: knex.fn.now()
            })
            .where({ id })
            ;


            return res.status(200).json({message: "Session was successfully closed!"})

        } catch(err) { 
            next(err); 
        }
    }
}

export {tablesSessionsController}