export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResponse{
    message: string;
    token: string
}