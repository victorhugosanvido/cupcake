
export class CupcakesDAO {
    runQuery;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(runQuery: (sql: string, params: unknown[]) => Promise<any[]>) {
        this.runQuery = runQuery;
    }


    async createCupcake(cupcakeName: string, cupcakeDescription: string, cupcakeNutritionalValue: string, cupcakeIngredients: string, cupcakeImage: File, cupcakePrice: string) {
        const sql = `insert into products (image, name, price, ingredients, description, nutitrional_info) values ($1, $2, $3, $4, $5, $6)`;

        const results = await this.runQuery(sql, [cupcakeImage, cupcakeName, cupcakePrice, cupcakeIngredients, cupcakeDescription, cupcakeNutritionalValue]);

        console.log(results);
    }
}