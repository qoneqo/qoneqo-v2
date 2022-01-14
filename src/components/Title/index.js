import React from 'react'

const Title = ({children, className}) => {
  return (
    <p className={`text-xl ${className}`}>
      {children}
    </p>
  )
}

Title.defaultProps = {
  className: '',
}
export default Title
