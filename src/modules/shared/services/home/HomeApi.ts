import { IUser } from '../../interfaces';
import { baseApi } from '../config';

export const getUsersApi = async() => {
    const res = await baseApi.get<IUser[]>('/users');
    return res.data;
}