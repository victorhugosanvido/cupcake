import { runQuery } from "@/backend/configs/database";
import { EmployeesDAO } from "@/backend/dao/Employees.dao";
import { ApiError } from "@/backend/utils/ApiError";
import { formatApiError } from "@/backend/utils/formatApiError";
import { verifyValuesAreString } from "@/backend/utils/verify";

export async function POST(request: Request) {
    const { email } = await request.json();

    if (!verifyValuesAreString([email])) {
        return Response.json({ statusMessage: 'Invalid body params.' }, { status: 400 });
    }

    const employeesDao = new EmployeesDAO(runQuery);
    try {
        const employee = await employeesDao.getEmployee(email);

        return Response.json(employee);
    } catch (error) {
        if (error instanceof ApiError) {
            return formatApiError(error);
        }
        console.log(error);
        return Response.json({ statusMessage: 'Unknown error' }, {
            status: 500
        });
    }

}