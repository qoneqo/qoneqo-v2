import React from 'react'

const Card = ({children, title, className, bodyClassName}) => {
  return (
    <>
      <div className={`card bg-white p-4 ${className} border rounded`}>
        <p className="text-lg m-0">{title}</p>
        <div className={`mt-3 ${bodyClassName}`}>
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
  bodyClassName: '',
};
export default Card
