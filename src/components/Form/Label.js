import React from 'react';

const Label = ({ children, className }) => {
  return <label className={`text-base ${className}`}>{children}</label>;
};

export default Label;
