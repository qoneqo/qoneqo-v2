import React from 'react'

const Section = ({children, className}) => {
  return (
    <>
      <section className={`my-4 ${className}`}>
        {children}
      </section>
    </>
  )
}

Section.defaultProps = {
  className: '',
};

export default Section
