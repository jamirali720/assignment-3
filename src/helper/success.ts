import { Response } from "express"

type TResponse <T> ={
    success: boolean, 
    statusCode: number, 
    message: string, 
    payload: T
}


export const successResponse  = <T>(res:Response, data: TResponse<T>) => {
    success: data.success;
    statusCode: data.statusCode;
    message: data.message;
    payload: data.payload
}