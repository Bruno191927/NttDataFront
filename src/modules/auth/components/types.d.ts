export interface IInputField {
    name: string;
    inputType: 'text' | 'email' | 'password';
    placeholder: string;
    label: string;
}

export interface IButton{
    buttonType: 'submit' | 'reset' | 'button';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    name: string;
}