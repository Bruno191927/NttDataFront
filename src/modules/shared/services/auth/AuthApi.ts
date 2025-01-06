import { ILogin, IRegister } from '../../interfaces';
import { baseApi } from '../config';

export const registerApi = async(data: IRegister) => {
    const response = await baseApi.post('/register', data);
    return response.data;
}

export const loginApi = async(data:ILogin) => {
    console.log('Llamando a login api');
    const response = await baseApi.post('/login', data);
    console.log('responseeeeeeeeeeeeeeeeee->',response)
    return response.data;
}