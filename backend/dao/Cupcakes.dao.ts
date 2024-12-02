import { ApiError } from "../utils/ApiError";

export class CupcakesDAO {
    runQuery;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(runQuery: (sql: string, params: unknown[]) => Promise<any[]>) {
        this.runQuery = runQuery;
    }


    async createCupcake(cupcakeName: string, cupcakeDescription: string, cupcakeNutritionalValue: string, cupcakeIngredients: string, cupcakeImage: string, cupcakePrice: string) {
        console.log(cupcakeImage);
        const sql = `insert into products (image, name, price, ingredients, description, nutitrional_info) values ($1, $2, $3, $4, $5, $6)`;

        const results = await this.runQuery(sql, [cupcakeImage, cupcakeName, cupcakePrice, cupcakeIngredients, cupcakeDescription, cupcakeNutritionalValue]);

        console.log(results);
    }

    async getCupcake(cupcakeId: string) {
        const sql = `select * from products where product_id = $1`;

        const results = await this.runQuery(sql, [cupcakeId]);

        if(results.length === 0) {
            throw new ApiError(404, 'Employee not found.');
        }

        return results[0];
    }
}