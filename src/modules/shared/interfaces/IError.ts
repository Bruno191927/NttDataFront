export interface IError{
    response: {
        data: IErrorResponse
    }
}

export interface IErrorResponse{
    error: string;
    message: string;
    statusCode: number;
}