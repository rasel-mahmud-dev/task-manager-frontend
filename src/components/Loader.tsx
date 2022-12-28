import React, {FC, HTMLAttributes} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {

}

const Loader: FC<Props> = ({className, ...other}) => {
    return (
        <div className={`flex gap-x-4 py-4 justify-center ${className}`} {...other}>
            <div className="animate-ping border-2 border-blue-600 w-4 h-4 rounded-full "></div>
            <div className="animate-ping border-2 border-blue-600 w-4 h-4 rounded-full "></div>
            <div className="animate-ping border-2 border-blue-600 w-4 h-4 rounded-full "></div>
            <div className="animate-ping border-2 border-blue-600 w-4 h-4 rounded-full "></div>
        </div>
    );
};

export default Loader;