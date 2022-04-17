import React, { useEffect, useRef } from 'react';

const Button = ({ children, type, className, onClick, autoFocus }) => {
  const btnRef = useRef(null);
  useEffect(() => {
    if(!autoFocus) return;
    btnRef.current?.focus();
  }, [autoFocus]);

  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary text-white rounded-xl p-2 ${className}`}
      ref={btnRef}
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
