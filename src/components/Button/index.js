import React from 'react'

const colors = {
  primary: 'bg-blue-500',
  secondary: 'bg-green-500',
  tertiary: 'bg-red-500',
};

const Button = ({type, children}) => {
  return (
    <button className={`rounded text-white py-1 px-2 m-1 ${colors[type]}`}>{children}</button>
  )
}

export default Button