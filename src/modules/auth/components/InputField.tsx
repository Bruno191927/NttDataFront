import { Field } from "formik"
import { IInputField } from './types';

const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
const fieldClass = "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const InputField = ({ name, label, placeholder, inputType }: IInputField) => {
    return (
        <div>
            <label htmlFor={name} className={labelClass}>{label}</label>
            <Field type={inputType} name={name} id={name} className={fieldClass} placeholder={placeholder} />
        </div>
    )
}

export default InputField