import React, {FC, HTMLAttributes} from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {

}

const Button: FC<Props> = ({className="", ...other}) => {
    return (
        <button className={`bg-blue-500 outline-none px-4 py-2 rounded-md text-white font-medium text-base ${className}`} {...other} />
    );
};

export default Button;