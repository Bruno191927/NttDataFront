import { useEffect, useState } from 'react';
import { tokenStore } from '../../shared/store/AuthTokenStore';
import { getUsersApi } from '../../shared/services/home/HomeApi';
import { useMutation } from '@tanstack/react-query';
import { IError, IUser } from '../../shared/interfaces';
import { useNavigate } from 'react-router-dom';

const HomeView = () => {
    const navigate = useNavigate();
    const token = tokenStore((state) => state.token);
    const setToken = tokenStore((state) => state.setToken);
    const [users, setUsers] = useState<IUser[]>([]);
    const userMutation = useMutation({
        mutationFn: getUsersApi,
        onSuccess: async (data: IUser[]) => {
            setUsers(data);
        },
        onError: async (error: IError) => {
            console.log(error.response.data);
        }
    });
    const logout = () => {
        setToken('');
        navigate('/');
    };

    useEffect(() => {
        console.log('Token: ', token)
        userMutation.mutate();
    }, []);
    return (
        <div className='w-full h-screen p-6'>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Lista de Usuarios</h5>
                    <p 
                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
                        onClick={logout}
                    >
                        Cerrar Sesión
                    </p>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            users.map((user, index) => (
                                <li className="py-3 sm:py-4" key={index}>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className='w-[40px] h-[40px] flex justify-center items-center bg-slate-400 rounded-[40px]'>
                                                <p className='text-white'>{index}</p>
                                            </div>
                                            
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {user.email}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default HomeView

/*

<div className='h-screen w-full p-7'>
            <div>
                <h1>Lista de usuarios</h1>
            </div>
            {
                users.map((user, index) => (
                    <div key={index}>
                        <h1>{user.email}</h1>
                    </div>
                ))
            }
        </div>
*/