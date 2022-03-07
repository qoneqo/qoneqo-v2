import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Form from '../Form';

const DefaultAction = ({obj, linkTo, onDelete}) => (
  <>
    <Link to={`/dashboard/${linkTo}/edit/${obj.id}`}>
      <Form.Button className="bg-secondary rounded mr-1">
        Edit <AiOutlineEdit className="inline-block" />{' '}
      </Form.Button>
    </Link>
    <Form.Button className="!bg-red-500 rounded" onClick={onDelete} >
      Delete <AiOutlineDelete className="inline-block" />
    </Form.Button>
  </>
);

export default DefaultAction;
