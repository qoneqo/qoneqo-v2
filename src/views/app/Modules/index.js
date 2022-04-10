import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import DataTable from '../../../components/Datatable';
import DefaultAction from '../../../components/Datatable/DefaultAction';
import Card from '../../../components/Card';
import Section from '../../../components/Section';
import Title from '../../../components/Title';
import Context from '../../../views/Context';

const Modules = () => {
  const { context } = useContext(Context);
  const [datatable, setDatatable] = useState({
    t_head: {
      id: 'Id',
      action: 'Action',
      module: 'Module',
      method: 'Method',
      path: 'Path',
      parent_module: 'Parent Module',
      app_name: 'App Name',
    },
    order_col: ['id', 'action', 'module', 'method', 'path', 'parent_module', 'app_name'],
    t_format: {
      action: (props) => <DefaultAction obj={props} linkTo='modules' onDelete={ () => handleDeleteRow(props.id) } />,
    },
    t_body: [],
    base_endpoint: '',
  });

  const handleDeleteRow = (id) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/modules/${id}`)
    .then((data) => {
      setDatatable(prev => ({
        ...prev,
        t_body: prev.t_body.filter(val => val.id !== id)
      }))
    })
    .catch(() => {})
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/modules/datatable?limit=10&offset=0`)
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
    <Title>Modules</Title>
      <Section>
        <Card title="List Modules">
          <DataTable {...datatable} serverside={true} />
        </Card>
      </Section>
    </>
  )
}

export default Modules