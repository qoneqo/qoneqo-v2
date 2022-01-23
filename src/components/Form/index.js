import React from 'react';
import Group from './Group';
import Input from './Input';
import Label from './Label';
import Button from './Button';

const Form = ({ children, className }) => {
  return <form className={`w-full p-2 ${className}`}>{children}</form>;
};

Form.Group = Group;
Form.Label = Label;
Form.Input = Input;
Form.Button = Button;

export default Form;
