export interface IRegister {
    email: string;
    password: string;
    name: string;
    cellphone?: string;
}

export interface IRegisterResponse{
    message: string;
    token: string
}