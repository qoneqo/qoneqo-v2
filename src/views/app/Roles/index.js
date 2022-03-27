import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import DataTable from '../../../components/Datatable';
import DefaultAction from '../../../components/Datatable/DefaultAction';
import Card from '../../../components/Card';
import Section from '../../../components/Section';
import Title from '../../../components/Title';
import Context from '../../../views/Context';
import moment from 'moment';

const Roles = () => {
  const { context } = useContext(Context);
  const [datatable, setDatatable] = useState({
    t_head: {
      id: 'Id',
      action: 'Action',
      name: 'Name',
      created_at: 'Created At',
      updated_at: 'Updated At',
      app_name: 'App Name',
    },
    order_col: ['id', 'action', 'name', 'created_at', 'updated_at', 'app_name'],
    t_format: {
      action: (props) => <DefaultAction obj={props} linkTo='roles' onDelete={ () => handleDeleteRow(props.id) } />,
      created_at: (props) => <span>{moment(props.created_at).format('DD MMM YYYY h:mm:ss A')}</span>,
      updated_at: (props) => <span>{moment(props.updated_at).format('DD MMM YYYY h:mm:ss A')}</span>,
    },
    t_body: [],
    base_endpoint: '',
  });

  const handleDeleteRow = (id) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/roles/${id}`)
    .then((data) => {
      setDatatable(prev => ({
        ...prev,
        t_body: prev.t_body.filter(val => val.id !== id)
      }))
    })
    .catch(() => {})
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/roles/datatable?limit=10&offset=0`)
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
    <Title>Roles</Title>
      <Section>
        <Card title="List Roles">
          <DataTable {...datatable} serverside={true} />
        </Card>
      </Section>
    </>
  )
}

export default Roles