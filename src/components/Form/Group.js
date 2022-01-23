import React from 'react';

const Group = ({ children, className }) => {
  return (
    <div className={`w-full flex flex-col my-2 ${className}`}>
      {children}
    </div>
  );
};

export default Group;
