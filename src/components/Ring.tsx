import React, {FC, HTMLAttributes} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement>{
    className?: string
}

const Ring: FC<Props> = ({className, ...other}) => {
    return (
        <div
            className={`text-xs w-7 h-7 flex items-center justify-center hover:text-white rounded-full bg-blue-500/20 cursor-pointer hover:bg-blue-500 ${className}`} {...other} ></div>
    );
};

export default Ring;