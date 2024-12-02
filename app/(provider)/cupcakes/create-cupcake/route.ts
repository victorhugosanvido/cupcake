import { runQuery } from "@/backend/configs/database"
import { CupcakesDAO } from "@/backend/dao/Cupcakes.dao"
import { put } from '@vercel/blob';
export async function POST(request: Request) {
    const formData = await request.formData()

    const cupcakeName = formData.get('cupcakeName') as string
    const cupcakeDescription = formData.get('cupcakeDescription') as string
    const cupcakeNutritionalValue = formData.get('cupcakeNutritionalValue') as string
    const cupcakeIngredients = formData.get('cupcakeIngredients') as string
    const cupcakePrice = formData.get('cupcakePrice') as string
    const cupcakeImage = formData.get('cupcakeImage') as File

    const link = await put(cupcakeImage.name, cupcakeImage, {
        access: 'public',
    });

    console.log(link);

    const cupcakesDAO = new CupcakesDAO(runQuery);
    
    await cupcakesDAO.createCupcake(cupcakeName, cupcakeDescription, cupcakeNutritionalValue, cupcakeIngredients, link.url , cupcakePrice);

    return Response.json({ statusMessage: 'Cupcake created.'});
}