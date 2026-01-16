import {Request, Response, NextFunction} from "express"; 
import {knex} from "@/database/knex";
import {z} from "zod"; 
import { AppError } from "@/utils/AppError";

class ordersController {


    async create(req:Request, res:Response, next:NextFunction) { 
        try { 
            const bodySchema = z.object({
                table_session_id : z.number(), 
                product_id : z.number(), 
                quantity : z.number().positive()
            }); 

            const {table_session_id, product_id, quantity} = bodySchema.parse(req.body); 

            const session = await knex<TableSessionsTable>("tables_sessions")
            .select().
            where({id: table_session_id})
            .first(); 

            if(!session) {
                throw new AppError("Session table not found",404);
            }; 

            if(session.closed_at) { 
                throw new AppError("This table is closed");
            };

            const product = await knex<ProductTable>("products")
            .select()
            .where({id: product_id})
            .first(); 

            if(!product) {
                throw new AppError("Product not found", 404);
            };

            await knex<OrderTable>("orders").insert({
                table_session_id, 
                product_id, 
                quantity, 
                price: product.price
            });


            return res.status(201).json({message: "Order done with successfully"});
        } catch(err) { 
            next(err); 
        }
    }; 
    
    async list(req:Request, res:Response, next: NextFunction) { 
        try { 
            const { table_session_id } = req.params ; 

            const order = await knex("orders")
            .select(
                "orders.id", 
                "orders.table_session_id",
                "orders.product_id", 
                "products.name", 
                "orders.price", 
                "orders.quantity", 
                knex.raw("ROUND(orders.price * orders.quantity, 2) AS total"), 
                "orders.created_at", 
                "orders.updated_at"
            )
            .join("products", "products.id", "orders.product_id")
            .where({table_session_id})
            .orderBy("orders.created_at", "desc")

            return res.status(200).json(order)
        } catch(err) {
            next(err); 
        }
    }; 

    async show(req: Request, res: Response, next: NextFunction) { 
        try {
            const {table_session_id} = req.params; 

            const order = await knex("orders")
            .select(
                knex.raw("COALESCE(ROUND(SUM(orders.price * orders.quantity),2),0) AS total"),
                knex.raw("COALESCE(SUM(orders.quantity),0) AS quantity")
            )
            .where({ table_session_id })
            .first()

            return res.status(200).json(order)
        } catch(err) { 
            next(err); 
        }
    }
}

export {ordersController}