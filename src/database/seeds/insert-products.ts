import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("products").del();

    // Inserts seed entries
    await knex("products").insert([
        {name: "Nhoque de quatro queijos", price : "44.90"}, 
        {name: "Isca de frango", price : "50.00"}, 
        {name: "Filé de Tilápia", price : "79.90"}, 
        {name: "Mandioca frita", price : "39.90"}, 
        {name: "Mandioca frita com filé", price : "99.90"}, 
        {name: "Escondidinho de carne de sol", price : "79.90"}, 
        {name: "Executivo de frango", price : "39.90"}, 
        {name: "Executivo parmegiana de frango", price : "39.90"}, 
        {name: "Executivo filé com fritas", price : "45.90"}, 
        {name: "Executivo almôndegas com purê", price : "39.90"}, 
        {name: "Refrigerante 350ml", price : "8.90"}, 
        {name: "Suco natural 440ml", price : "12.90"}, 
        {name: "Água 600ml", price : "5.90"}, 
        {name: "Água com gás 600ml", price : "8.90"}, 
    ]);
};
