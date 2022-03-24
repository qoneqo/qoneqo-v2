import React, { useState, useEffect } from 'react'

const Alert = (props) => {
  const { title, message, timeOut } = props || {
    title: 'Success',
    message: 'Action Success',
    timeOut: 3000,
  };

  const [state, setState] = useState({
    show: false,
  });

  useEffect(() => {
    setState(prev => ({...prev, show: true}))
    const time = setTimeout(() => {
      setState(prev => ({...prev, show: false}))
    }, timeOut);
    return () => clearTimeout(time);
  }, [])
  

  return (
    state.show &&
    <div className="p-4 fixed z-10 top-0 left-0 right-0 bottom-0 w-96 h-44 m-auto bg-white flex flex-col items-center justify-center rounded-lg shadow-sm border-2 text-base">
      <p className="text-center text-lg my-2">{ title }</p>
      <p className="text-center text-gray-600 text-md">
        <small>
          { message }
        </small>
      </p>
    </div>
  )
}

Alert.defaultProps = {
  title: 'Success',
  message: 'Action Success',
  timeOut: 3000,
};

export default Alert