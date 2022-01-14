import React from 'react'

const Card = ({children, title, className}) => {
  return (
    <>
      <div className={`bg-white p-4 ${className}`}>
        <p className="text-lg m-0">{title}</p>
        <div className="mt-3">
          {children}
        </div>
      </div>
    </>
  )
}
Card.defaultProps = {
  children: null,
  title: null,
  className: '',
};
export default Card
