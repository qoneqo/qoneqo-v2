import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from '../../../components/Title';
import Section from '../../../components/Section';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Datatable from '../../../components/Datatable';
import { Link } from 'react-router-dom';

const Users = () => {
  const [datatable, setDatatable] = useState({
    t_head: {
      id: 'id',
      action: 'Action',
      identifier: 'Username',
      name: 'Name',
      email: 'Email',
      is_active: 'Status',
    },
    order_col: ['id', 'action', 'identifier', 'name', 'email', 'is_active'],
    t_format: {
      action: (props) => (<><Link to={`/dashboard/users/edit/${props.id}`}><Button type="primary">Edit</Button></Link><Button type="tertiary">Delete</Button></>),
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
  }, [])

  return (
    <>
      <Title>Users</Title>
      <section>
        <Section>
          <Card title="List Users">
            <Datatable {...datatable} serverside={true} />
          </Card>
        </Section>
      </section>
    </>
  );
};

export default Users;
