import React from 'react';

const Input = ({ placeholder, type, id, className, value, onChange }) => {
  return (
    <input
      id={id}
      className={`text-base w-full border rounded-xl p-2 ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

Input.defaultProps = {
  placeholder: '',
  type: 'text',
};

export default Input;
