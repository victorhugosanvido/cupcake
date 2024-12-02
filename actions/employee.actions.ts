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

export async function createNewKey(key: string, role: string) {
    const response = await axios.post('/api/auth/employee/create-new-key', {
        key,
        role
    });

    return response.data;
}

export async function getKeys() {
    const response = await axios.get('/api/auth/employee/get-keys');
    console.log('here');
    console.log(response);
    return response.data;
}
