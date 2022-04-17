import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { QAlert, QConfirm } from '../Alerts';
import Form from '../Form';

const DefaultAction = ({obj, linkTo, onDelete}) => {
  const handleDelete = () => {
    QConfirm({
      confirmed: {
        yes: () => {
          QAlert({title: 'Success', message: 'Delete Success!'});
          onDelete();
        },
        cancel: () => {
          QAlert({title: 'Canceled', message: 'Action Canceled!'});
        }
      }
    });
  }

  return (
    <>
      {
        linkTo && 
        <Link to={`/dashboard/${linkTo}/edit/${obj.id}`}>
          <Form.Button className="bg-secondary rounded mr-1">
            Edit <AiOutlineEdit className="inline-block" />{' '}
          </Form.Button>
        </Link>
      }
      {
        onDelete &&
        <Form.Button 
          className="!bg-red-500 rounded qoneqo-alert" 
          onClick={handleDelete} 
        >
          Delete <AiOutlineDelete className="inline-block qoneqo-alert" />
        </Form.Button>
      }
    </>
  )
};

export default DefaultAction;
