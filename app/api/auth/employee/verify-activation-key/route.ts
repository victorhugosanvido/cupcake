import { runQuery } from "@/backend/configs/database";
import { EmployeesDAO } from "@/backend/dao/Employees.dao";

export async function POST(request: Request) {
    const { activationKey } = await request.json();
    if(typeof activationKey !== 'string') {
        return Response.json({ statusMessage: 'Invalid body params.' }, {status: 400});
    }
    const employeesDao = new EmployeesDAO(runQuery);

    const isKeyValid = await employeesDao.verifyActivationKeyIsValid(activationKey);

    return Response.json({ isKeyValid });
}