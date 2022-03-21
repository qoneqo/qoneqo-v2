import React from 'react';
import Group from './Group';
import Input from './Input';
import Label from './Label';
import Button from './Button';
import Select from './Select';

const Form = ({ children, className, onSubmit }) => {
  return <form className={`w-full p-2 ${className}`} onSubmit={onSubmit}>{children}</form>;
};

Form.Group = Group;
Form.Label = Label;
Form.Input = Input;
Form.Button = Button;
Form.Select = Select;

export default Form;
