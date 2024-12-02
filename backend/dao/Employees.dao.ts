import { ApiError } from "../utils/ApiError";

export class EmployeesDAO {
    runQuery;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(runQuery: (sql: string, params: unknown[]) => Promise<any[]>) {
        this.runQuery = runQuery;
    }

    async verifyActivationKeyIsValid(key: string) {
        const result = await this.runQuery(
            `select * from KEYS where activation_key = $1 and is_key_used = false and key_status = true`,
            [key]
        );

        return result.length > 0;
    }

    async getEmployee(email: string) {
        const sql = `
            select 
                employee.name, 
                employee.email, 
                keys.role 
            from 
                employee 
            inner join 
                keys 
                    on employee.activation_key = keys.activation_key 
            where employee.email = $1`;

        const results = await this.runQuery(sql, [email]);

        if(results.length === 0) {
            throw new ApiError(404, 'Employee not found.');
        }

        return results[0]
    }

    async createEmployee(key: string, name: string, email: string) {
        const isKeyValid = await this.verifyActivationKeyIsValid(key);

        if(!isKeyValid) {
            throw new ApiError(404, 'Activation key is invalid.');
        }

        await this.changeKeyStatusToUsed(key);

        const sql = `insert into EMPLOYEE (name, email, activation_key) values ($1, $2, $3)`
        await this.runQuery(sql, [name, email, key]);
    }

    async changeKeyStatusToUsed(key: string) {
        const sql = `update KEYS set is_key_used = true where activation_key = $1`;
        await this.runQuery(sql, [key]);
    }
}