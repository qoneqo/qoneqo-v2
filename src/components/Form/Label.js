import React from 'react';

const Label = ({ children, className, htmlFor }) => {
  return <label className={`text-base ${className}`} htmlFor={htmlFor}>{children}</label>;
};

export default Label;
