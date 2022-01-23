import React from 'react';

const Button = ({ children, type, className, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary text-white rounded-xl p-2 ${className}`}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  children: 'Button',
};

export default Button;
