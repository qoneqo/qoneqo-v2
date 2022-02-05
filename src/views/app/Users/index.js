import { useState, useEffect } from 'react';
import axios from 'axios';
import Title from '../../../components/Title';
import Section from '../../../components/Section';
import Card from '../../../components/Card';
import Datatable from '../../../components/Datatable';

const Users = () => {
  const [datatable, setDatatable] = useState({
    t_head: {
      id: 'id',
      identifier: 'Username',
      name: 'Name',
      email: 'Email',
      is_active: 'Status',      
    },
    t_body: [],
    order_col: ['id', 'identifier', 'name', 'email', 'is_active'],
    base_endpoint: '',
  });
  useEffect(() => {
    axios.get('http://localhost:9999/users/datatable?limit=10&offset=0')
    .then(({data}) => {
      setDatatable(prev => ({
        ...prev,
        ...data.widget_data,
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
