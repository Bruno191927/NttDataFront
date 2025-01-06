import { ErrorMessage, Form, Formik } from "formik";
import { IError, ILogin, ILoginResponse } from "../../shared/interfaces";
import * as Yup from 'yup';
import InputField from "../components/InputField";
import Button from "../components/Button";
import ErrorMessageComponent from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../shared/services/auth/AuthApi";
import { tokenStore } from "../../shared/store/AuthTokenStore";
import { toast } from 'sonner';


const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("El correo debe tener un formato válido")
        .required("El correo es obligatorio"),
    password: Yup.string()
        .required("La contraseña es obligatoria")
        .matches(
            /^(?=.*[A-Z])(?=.*\d)/,
            "La contraseña debe contener al menos una letra mayúscula y un dígito"
        )
});

const initialValues: ILogin = {
    email: '',
    password: '',
};

const LoginView = () => {
    const setToken = tokenStore((state) => state.setToken);
    const navigate = useNavigate();

    const handleNavigateToRegister = () => {
        navigate('/register');
    };

    const loginMutation = useMutation({
        mutationFn: loginApi,
        onSuccess: async (data: ILoginResponse) => {
            setToken(data.token);
            navigate('/home')
        },
        onError: async (error: IError) => {
            toast.error(error.response.data.message);
        }
    });
    return (
        <div className="h-full w-full flex justify-center items-center px-4">
            <section className="dark:bg-gray-900 w-full max-w-[500px]">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={loginSchema}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(false);
                            loginMutation.mutate(values);
                        }}
                    >
                        {() => (
                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                        Ingresa
                                    </h1>
                                    <Form className="space-y-4 md:space-y-6">
                                        <InputField
                                            inputType="email"
                                            label="Correo Electronico"
                                            name="email"
                                            placeholder="name@company.com"
                                        />
                                        <InputField
                                            inputType="password"
                                            label="Contraseña"
                                            name="password"
                                            placeholder="••••••••"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            render={(msg) => <ErrorMessageComponent msg={msg} />}
                                        />
                                        <ErrorMessage
                                            name="password"
                                            render={(msg) => <ErrorMessageComponent msg={msg} />}
                                        />
                                        <Button
                                            name="Ingresa"
                                            buttonType="submit"
                                        />
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-end">
                                            No tienes cuenta?
                                            <span
                                                className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                                                onClick={handleNavigateToRegister}
                                            >
                                                Registrate
                                            </span>
                                        </p>
                                    </Form>
                                </div>
                            </div>
                        )}
                    </Formik>
                </div>
            </section>
        </div>
    )
}

export default LoginView