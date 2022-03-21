import React from 'react';

const Select = ({ id, className, value, onChange, children }) => {
  return (
    <select
      id={id}
      className={`text-base cursor-pointer w-full border rounded-xl p-2 ${className}`}
      value={value}
      onChange={onChange}
    >
      { children }
    </select>
  );
};

export default Select;
