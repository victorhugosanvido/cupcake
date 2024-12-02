import { ApiError } from "./ApiError";


export function formatApiError(error: ApiError) {
    return Response.json({statusMessage: error.message}, {
        status: error.code
    }); 
}