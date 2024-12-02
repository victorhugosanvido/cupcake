import axios from "axios";

export async function verifyActivationKeyIsValid(activationKey: string) {
    const response = await axios.post('/api/auth/employee/verify-activation-key', {
        activationKey
    })

    return response.data;
}


export async function createNewUser(key: string, name: string, email: string) {
    const response = await axios.post('/api/auth/employee/create-employee', {
        key,
        name,
        email
    });

    return response.data;
}

export async function getEmployee(email: string) {
    const response = await axios.post('/api/auth/employee/get-employee', {
        email
    });

    return response.data;
}