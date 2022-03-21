import React from 'react';

const Label = ({ children, className, htmlFor }) => {
  return <label className={`text-base my-2 ${className}`} htmlFor={htmlFor}>{children}</label>;
};

export default Label;
