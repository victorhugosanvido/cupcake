import axios from "axios";


export async function createCupcake(cupcakeName: string, cupcakeDescription: string, cupcakeNutritionalValue: string, cupcakeIngredients: string, cupcakeImage: File, cupcakePrice: string) {
    const response = await axios.postForm('/api/cupcakes/create-cupcake', {
        cupcakeName,
        cupcakeDescription,
        cupcakeNutritionalValue,
        cupcakeIngredients,
        cupcakeImage,
        cupcakePrice
    })

    console.log(response.data);
}