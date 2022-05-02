import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Title from '../../../components/Title';
import Section from '../../../components/Section';
import Card from '../../../components/Card';
import Datatable from '../../../components/Datatable';
import Context from '../../../views/Context';
import Button from '../../../components/Form/Button';
import UserRole from './UserRole';
import { Link } from 'react-router-dom';
import Form from '../../../components/Form';

const UserRoleIndex = () => {  
  const { context } = useContext(Context);
  const [stateParams, setStateParams] = useState({});
  const [datatable, setDatatable] = useState({
    t_head: {
      id: 'Id',
      action: 'Action',
      identifier: 'Username',
      name: 'Name',
      email: 'Email',
      app_name: 'App Name',
      is_active: 'Status',
    },
    order_col: ['id', 'action', 'identifier', 'name', 'email', 'app_name', 'is_active'],
    t_format: {
      action: (props) => 
      <Link to={`/dashboard/user-role/edit/${props.id}`}>
        <Form.Button className="bg-secondary rounded mr-1">
          Choose
        </Form.Button>
      </Link>,
      is_active: (props) => (<>{ props.is_active === 0 ? 'Inactive' : 'Active' }</>)
    },
    t_body: [],
    base_endpoint: '',
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/datatable?limit=10&offset=0`)
    .then(({data}) => {
      setDatatable(prev => ({
        ...prev,
        ...data.widget_data,
        t_head: prev.t_head,
        order_col: prev.order_col,
      }));
    })
    .catch(() => {})
  }, [context.appListSelected])

  return (
    <>
      <Title>User Role</Title>
      <Section>
        <Card title="List User">
          <Datatable {...datatable} add_btn={false} serverside={true} />
        </Card>
      </Section>
    </>
  );
};

export default UserRoleIndex;
