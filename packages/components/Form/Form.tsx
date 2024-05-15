import React, { CSSProperties, ReactNode, useState, useRef, FormEvent } from "react";
import FormContext from "./FormContext";
import Item from './Item';
import classNames from "classnames";

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
    className?: string;
    style?: CSSProperties;
    onFinish?: (value: Record<string, any>) => void;
    onFinishFailed?: (errors: Record<string, any>) => void;
    initialValues?: Record<string, any>;
    children?: ReactNode
}

const Form = (props: FormProps) => {
    const {
        className,
        style,
        children,
        onFinish,
        onFinishFailed,
        initialValues,
        ...others
    } = props

    const [values, setValues] = useState<Record<string, any>>(initialValues || {});

    const validatorMap = useRef(new Map<string, Function>());

    const errors = useRef<Record<string, any>>({});

    const onValueChange = (key: string, value: any) => {
        values[key] = value
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // for(let [key, callbackFunc] of validatorMap.current) {
        //     if(callbackFunc === 'function') {
        //         errors.current[key] = callbackFunc();
        //     }
        // }

        const errorList = Object.keys(errors.current).map(key => {
            return errors.current[key]
        }).filter(Boolean);

        if(errorList.length) {
            onFinishFailed?.(errors.current);
        } else {
            onFinish?.(values)
        }
    }

    const handleValidateRegister = (name: string, cb: Function) => {
        validatorMap.current.set(name, cb);
    }

    const cls = classNames('ant-form', className)

    return (
        <FormContext.Provider 
            value = {{
                onValueChange,
                values,
                setValues: (v) => setValues(v),
                validateRegister: handleValidateRegister
            }}
        >
            <form {...others} className={cls} style={style} onSubmit={handleSubmit}>{children}</form>
        </FormContext.Provider>
    )
}

Form.Item = Item;

export default Form;