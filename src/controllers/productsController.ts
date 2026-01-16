import {Request, Response, NextFunction} from "express"; 
import { AppError } from "@/utils/AppError";
import {knex} from "../database/knex"; 
import {z} from "zod"; 

class productController { 

    async create(req: Request, res: Response, next: NextFunction) {
        try{

            const bodySchema = z.object({
                name: z.string().trim().min(5),
                price: z.number().positive()

            }); 

            const {name,price} = bodySchema.parse(req.body)

            await knex<ProductTable>("products").insert({name,price});
            //<> -> Isso define a tipagem da tabela, você não consegue passar nenhum parâmetro que não esteja na tipagem (Tipo uma interface)
    
            const productSelected = await knex("products").select().where({name: name});
            
            return res.status(201).json(productSelected); 

        } catch(err) { 
            next(err);
        }
    }; 

    async list(req: Request, res: Response, next: NextFunction) { 
        try {

            const {name} = req.query; 

            const allProducts = await knex<ProductTable>("products")
            .select()
            .whereLike("name", `%${name ?? ""}%`) //procura na columa nome -> se tiver no meio do nome o nome que você passou devolve, se não devolve tudo
            .orderBy("name"); 
            return res.status(200).json(allProducts)
        } catch(err) { 
            next(err); 
        }
    }; 

    async update(req:Request, res: Response, next: NextFunction) { 
        try {
            const id = z
            .string()
            .transform((value) => Number(value)) //o id vem como string da URL, isso faz com que ele sempre venha como número, e caso não venha ele joga a mensagem 
            .refine((value)=> !isNaN(value), {message: "Id must be a number"})
            .parse(req.params.id);

            const bodySchema = z.object({
                name: z.string().trim().min(5), 
                price: z.number().positive()
            }); 
            const {name, price} = bodySchema.parse(req.body); 

            await knex<ProductTable>("products").update({name,price, updated_at: knex.fn.now()}).where({id:id});

            const productSelected = await knex<ProductTable>("products").select().where({id:id})

            return res.status(200).json(productSelected)
        } catch(err) { 
            next(err); 
        }
    }; 

    async remove(req: Request, res: Response, next: NextFunction) { 
        try { 
            const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), {message: "Id must be a number"})
            .parse(req.params.id); 

            await knex<ProductTable>("products").delete().where({id:id}); 

            return res.status(204).end(); 
        } catch(err) { 
            next(err); 
        }
    }; 

    async find(req: Request, res: Response, next: NextFunction) { 
        try{
            const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), {message: "Id must be a number"})
            .parse(req.params.id);
    
            const productFounded = await knex<ProductTable>("products").select().where({id:id}).first(); 
            if(!productFounded) { 
                throw new AppError("Product not found", 404)
            }
            next();  
        } catch(err) { 
            next(err); 
        }
    }

}

export {productController}; 