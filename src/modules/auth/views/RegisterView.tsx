import { ErrorMessage, Formik } from "formik"
import * as Yup from 'yup';
import { IError, IRegister, IRegisterResponse } from "../../shared/interfaces";
import { Form } from "formik";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ErrorMessageComponent from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../shared/services/auth/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { tokenStore } from "../../shared/store/AuthTokenStore";
import { toast } from "sonner";
const registerSchema = Yup.object().shape({
    email: Yup.string()
        .email("El correo debe tener un formato válido")
        .required("El correo es obligatorio"),
    password: Yup.string()
        .required("La contraseña es obligatoria")
        .matches(
            /^(?=.*[A-Z])(?=.*\d)/,
            "La contraseña debe contener al menos una letra mayúscula y un dígito"
        ),
    name: Yup.string()
        .required("El nombre es obligatorio"),
    cellphone: Yup.string()
        .optional()
        .matches(
            /^\d{9}$/,
            "El número de celular debe tener exactamente 9 dígitos"
        )
});
const initialValues: IRegister = {
    email: '',
    password: '',
    name: '',
    cellphone: ''
};
const RegisterView = () => {
    const setToken = tokenStore((state) => state.setToken);
    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationFn: registerApi,
        onSuccess: async (data: IRegisterResponse) => {
            setToken(data.token);
            navigate('/home');
        },
        onError: async (error: IError) => {
            toast.error(error.response.data.message);
        }
    });

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="h-full w-full flex justify-center items-center px-4">
            <section className="dark:bg-gray-900 w-full max-w-[500px]">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={registerSchema}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(false);
                            registerMutation.mutate(values);
                        }}
                    >
                        {() => (
                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                        Registrate
                                    </h1>
                                    <Form className="space-y-4 md:space-y-6">
                                        <InputField
                                            inputType="text"
                                            label="Nombre Completo"
                                            name="name"
                                            placeholder="Jhon Doe"
                                        />
                                        <InputField
                                            inputType="text"
                                            label="Número telefonico"
                                            name="cellphone"
                                            placeholder="952405452"
                                        />
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
                                        <ErrorMessage
                                            name="cellphone"
                                            render={(msg) => <ErrorMessageComponent msg={msg} />}
                                        />
                                        <ErrorMessage
                                            name="name"
                                            render={(msg) => <ErrorMessageComponent msg={msg} />}
                                        />
                                        <Button
                                            name="Registrate"
                                            buttonType="submit"
                                        />
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-end">
                                            Ya tienes cuenta?
                                            <span
                                                className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                                                onClick={handleNavigateToLogin}
                                            >
                                                Ingresa
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

export default RegisterView