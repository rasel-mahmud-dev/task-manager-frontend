import React, {FC, HTMLAttributes} from 'react';

interface Props {
    message?: string
}

const ErrorMessage: FC<Props> = ({message}) => {
    return message ? (
        <p className={`bg-[#ff9494]  text-white text-base px-3 py-2 rounded-md`}>
            {message}
        </p>
    ) : null;
};

export default ErrorMessage;