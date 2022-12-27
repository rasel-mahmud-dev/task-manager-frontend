import React, {FC, HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
    label: string
    name: string
    value: string
    onChange: (e: any) => void
    as?: "textarea"
}

const InputGroup: FC<Props> = ({name, label, as, onChange, placeholder, value}) => {
    return (
        <div className="flex flex-col items-start py-2">
            <label className="font-medium text-dark-500" htmlFor={name}>{label}</label>
            {as === "textarea" ? (
                <textarea
                    name={name}
                    onChange={onChange}
                    id={name}
                    value={value}
                    className="bg-transparent border outline-none rounded-md w-full px-2 py-1"
                    placeholder={placeholder}/>
            ) : (
                <input
                    onChange={onChange}
                    name={name}
                    id={name}
                    value={value}
                    className="bg-transparent border outline-none rounded-md w-full px-2 py-1"
                    type="text"
                    placeholder={placeholder}/>
            )}
        </div>
    )
}

export default InputGroup