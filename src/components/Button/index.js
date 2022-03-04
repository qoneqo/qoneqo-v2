import React from 'react'

const index = ({type, children}) => {
  const style = {
    primary: 'blue',
    secondary: 'green',
    ternary: 'red',
  };
  return (
    <button className={`rounded text-white py-1 px-2 m-1 bg-${style[type]}-500`}>{children}</button>
  )
}

export default index