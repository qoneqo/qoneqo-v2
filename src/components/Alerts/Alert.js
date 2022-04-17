import React, { useState, useEffect } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineCloseCircle,
} from 'react-icons/ai';

const Alert = (props) => {
  const { title, message, messageType, timeOut } = props || {
    title: 'Success',
    message: 'Action Success',
    messageType: 'success',
    timeOut: 2000,
  };

  const [state, setState] = useState({
    show: false,
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, show: true }));
    const time = setTimeout(() => {
      setState((prev) => ({ ...prev, show: false }));
    }, timeOut);
    return () => clearTimeout(time);
  }, []);

  return (
    state.show && (
      <div className="p-4 fixed z-10 top-0 left-0 right-0 bottom-0 w-96 h-44 m-auto bg-white flex flex-col items-center justify-center rounded-lg shadow-sm border-2 text-base">
        <p className="text-center text-lg my-2">
          {messageType === 'success' ? (
            <AiOutlineCheckCircle className={`inline-block mx-1`} />
          ) : messageType === 'warning' ? (
            <AiOutlineExclamationCircle className={`inline-block mx-1`} />
          ) : (
            <AiOutlineCloseCircle className={`inline-block mx-1`} />
          )}
          {title}
        </p>
        <p className="text-center text-gray-600 text-md">
          <small>{message}</small>
        </p>
      </div>
    )
  );
};

Alert.defaultProps = {
  title: 'Success',
  message: 'Action Success',
  messageType: 'success',
  timeOut: 2000,
};

export default Alert;
