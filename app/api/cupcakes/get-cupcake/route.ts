import { runQuery } from "@/backend/configs/database"
import { CupcakesDAO } from "@/backend/dao/Cupcakes.dao"
import { verifyValuesAreString } from "@/backend/utils/verify";

export async function POST(request: Request) {
    const { cupcakeId } = await request.json();

    if (!verifyValuesAreString([cupcakeId])) {
        return Response.json({ statusMessage: 'Invalid body params.' }, { status: 400 });
    }

    const cupcakesDAO = new CupcakesDAO(runQuery);    

    const cupcake = await cupcakesDAO.getCupcake(cupcakeId);

    return Response.json(cupcake);
}