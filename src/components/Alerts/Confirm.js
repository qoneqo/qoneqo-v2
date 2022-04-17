import React, { useState, useEffect } from 'react'
import Button from '../Form/Button'

const Confirm = (props) => {
  const { title, message, confirmed, timeOut } = props || {
    title: 'The weather is cold today!',
    message: 'Are you sure with this action ?',
    confirmed: null,
    timeOut: null,
  };

  const [state, setState] = useState({
    show: false,
  });

  useEffect(() => {
    const time = setTimeout(() => {
      setState(prev => ({...prev, show: true}))
    }, timeOut);
    return () => clearTimeout(time);
  }, [])
  
  return (
    state.show &&
    <div className="p-4 fixed z-10 top-0 left-0 right-0 bottom-0 w-96 h-44 m-auto bg-white flex flex-col items-center justify-center rounded-lg shadow-sm border-2 text-base">
      <p className="text-center text-lg my-2">{ title }</p>
      <p className="text-center text-gray-600 text-md"><small>{ message } </small></p>
      <div className="flex justify-end w-full gap-1 mt-8">
        <Button 
          className="text-sm p rounded-1 w-20 !text-black !bg-gray-300 qoneqo-alert" 
          onClick={() => {
            confirmed.cancel && confirmed?.cancel();
            setState(prev => ({...prev, show: false}));
          }}>
            Cancel
        </Button>
        <Button 
          className="text-sm p-1 w-20 qoneqo-alert" 
          onClick={(e) => {
            e.preventDefault();
            confirmed?.yes()
          }}
          autoFocus={true}
        >
          Yes
        </Button>
      </div>
    </div>
  )
}

Confirm.defaultProps = {
  title: 'The weather is cold today!',
  message: 'Are you sure cool with that ?',
  confirmed: {
    cancel: function() {},
    yes: function() {},
  },
  timeOut: null,
};

export default Confirm;
