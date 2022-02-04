import { useState, useEffect } from 'react';
import axios from 'axios';
import Title from '../../../components/Title';
import Section from '../../../components/Section';
import Card from '../../../components/Card';
import Datatable from '../../../components/Datatable';

const dataTable = {
  t_head: {
    name: 'Name',
    email: 'Email',
    age: 'Age',
    phone: 'Phone',
  },
  t_body: [
    {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      age: '24',
      phone: '08493333444',
    },
    {
      name: 'Jean Dean',
      email: 'jeandean@gmail.com',
      age: '22',
      phone: '081232134555',
    },
    {
      name: 'Naka Mura',
      email: 'nakamura@gmail.com',
      age: '30',
      phone: '021344445555',
    },
    {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      age: '24',
      phone: '08493333444',
    },
    {
      name: 'Jean Dean',
      email: 'jeandean@gmail.com',
      age: '22',
      phone: '081232134555',
    },
    {
      name: 'Naka Mura',
      email: 'nakamura@gmail.com',
      age: '30',
      phone: '021344445555',
    },
    {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      age: '24',
      phone: '08493333444',
    },
    {
      name: 'Jean Dean',
      email: 'jeandean@gmail.com',
      age: '22',
      phone: '081232134555',
    },
    {
      name: 'Naka Mura',
      email: 'nakamura@gmail.com',
      age: '30',
      phone: '021344445555',
    },
    {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      age: '24',
      phone: '08493333444',
    },
    {
      name: 'Jean Dean',
      email: 'jeandean@gmail.com',
      age: '22',
      phone: '081232134555',
    },
    {
      name: 'Naka Mura',
      email: 'nakamura@gmail.com',
      age: '30',
      phone: '021344445555',
    },
  ],
  order_col: [
    'name', 'email', 'age', 'phone',
  ],
};

const Users = () => {
  useEffect(() => {
    axios.get('http://localhost:9999/users')
    .then(({data}) => {
      console.log(data);
    })
    .catch(() => {})
  }, [])
  return (
    <>
      <Title>Users</Title>
      <section>
        <Section>
          <Card title="List Users">
            <Datatable {...dataTable} />
          </Card>
        </Section>
      </section>
    </>
  );
};

export default Users;
