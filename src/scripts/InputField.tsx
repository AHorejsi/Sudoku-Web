import "../styles/InputField.scss";
import { FormEventHandler, ReactNode } from "react";

interface InputFieldProps {
    label: string;

    prompt: string;

    classes?: string;

    covered: boolean;

    inputEvent: FormEventHandler<HTMLInputElement>
}

export default function InputField(props: InputFieldProps): ReactNode {
    return (
        <div className="container field-block">
            <label className="field-title" htmlFor={props.label}>{props.prompt}</label>
            <input 
                className={props.classes} type={props.covered ? "password" : "text"} name={props.label}
                onInput={props.inputEvent}
            />
        </div>
    );
}
