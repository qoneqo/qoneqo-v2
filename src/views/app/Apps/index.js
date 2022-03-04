import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from '../../../components/Title';
import Section from '../../../components/Section';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Datatable from '../../../components/Datatable';
import { Link } from 'react-router-dom';

const Apps = () => {
  const [datatable, setDatatable] = useState({
    t_head: {
      id: 'Id',
      action: 'Action',
      name: 'Name',
      logo: 'Logo',
      type: 'Type',
    },
    order_col: ['id', 'action', 'name', 'logo', 'type'],
    t_format: {
      action: (props = {}) => (<><Link className="" to={`/dashboard/apps/edit/${props.id}`}><Button type="primary">Edit</Button></Link><Button type="ternary">Delete</Button></>)
    },
    t_body: [],
    base_endpoint: '',
  });
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/apps/datatable?limit=10&offset=0`)
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
      <Title>Apps</Title>
      <section>
        <Section>
          <Card title="List Apps">
            <Datatable {...datatable} serverside={true} />
          </Card>
        </Section>
      </section>
    </>
  );
};

export default Apps;
