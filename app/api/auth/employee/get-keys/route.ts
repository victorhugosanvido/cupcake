import { runQuery } from "@/backend/configs/database";
import { EmployeesDAO } from "@/backend/dao/Employees.dao";
import { ApiError } from "@/backend/utils/ApiError";
import { formatApiError } from "@/backend/utils/formatApiError";
import { verifyValuesAreString } from "@/backend/utils/verify";

export async function GET(request: Request) {
    const employeesDao = new EmployeesDAO(runQuery);
    try {
        const keys = await employeesDao.getKeys();

        return Response.json(keys);
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