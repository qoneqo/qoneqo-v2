import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Title from '../../../components/Title';
import Section from '../../../components/Section';
import Card from '../../../components/Card';
import Datatable from '../../../components/Datatable';
import DefaultAction from '../../../components/Datatable/DefaultAction';
import Context from '../../../views/Context';

const Users = () => {
  const { context } = useContext(Context);
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
      action: (props) => <DefaultAction obj={props} linkTo='users' onDelete={ () => handleDeleteRow(props.id) } />,
      is_active: (props) => (<>{ props.is_active === 0 ? 'Inactive' : 'Active' }</>)
    },
    t_body: [],
    base_endpoint: '',
  });

  const handleDeleteRow = (id) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/users/${id}`)
    .then((data) => {
      setDatatable(prev => ({
        ...prev,
        t_body: prev.t_body.filter(val => val.id !== id)
      }))
    })
    .catch(() => {})
  }

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
