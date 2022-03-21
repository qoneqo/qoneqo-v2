import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Title from '../../../components/Title';
import Section from '../../../components/Section';
import Card from '../../../components/Card';
import Datatable from '../../../components/Datatable';
import DefaultAction from '../../../components/Datatable/DefaultAction';
import Context from '../../../views/Context';

const Apps = () => {
  const { context, setContext } = useContext(Context);
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
      action: (props) => <DefaultAction obj={props} linkTo='apps' onDelete={ () => handleDeleteRow(props.id) } />,
    },
    t_body: [],
    base_endpoint: '',
    changes: 0,
  });

  const handleDeleteRow = (id) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/apps/${id}`)
    .then((data) => {
      setDatatable(prev => ({
        ...prev,
        t_body: prev.t_body.filter(val => val.id !== id)
      }))
      setContext(prev => ({...prev, appsList: prev.appsList.filter(val => val.id !== id)}))
    })
    .catch(() => {})
  }

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
  }, [context.appListSelected])

  return (
    <>
      <Title>Apps</Title>
      <Section>
        <Card title="List Apps">
          <Datatable {...datatable} serverside={true} />
        </Card>
      </Section>
    </>
  );
};

export default Apps;
