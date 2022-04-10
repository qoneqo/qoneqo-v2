import axios from 'axios';
import moment from 'moment';
import React, {useState, useEffect} from 'react'
import Card from '../../../components/Card';
import Datatable from '../../../components/Datatable';
import DefaultAction from '../../../components/Datatable/DefaultAction';

const UserRoleList = ({ params, stateSubmitted: [stateSubmitted, setStateSubmitted] }) => {
  const [datatable, setDatatable] = useState({
    t_head: {
      id: 'Id',
      action: 'Action',
      role_name: 'Role Name',
      created_at: 'Created At',
      updated_at: 'Updated At',
      app_name: 'App Name',
    },
    order_col: ['id', 'action', 'role_name', 'created_at', 'updated_at', 'app_name'],
    t_format: {
      action: (props) => <DefaultAction obj={props} onDelete={ () => handleDeleteRow(props.id) } />,
      created_at: (props) => <span>{moment(props.created_at).format('DD MMM YYYY h:mm:ss A')}</span>,
      updated_at: (props) => <span>{moment(props.updated_at).format('DD MMM YYYY h:mm:ss A')}</span>,
    },
    t_body: [],
    base_endpoint: '',
  });

  const handleDeleteRow = (id) => {
    axios
    .delete(`${process.env.REACT_APP_API_URL}/user-role/${id}`)
    .then((data) => {
      setDatatable(prev => ({
        ...prev,
        t_body: prev.t_body.filter(val => val.id !== id)
      }))
    })
    .catch(() => {})
  }

  useEffect(() => {
    if (!params.id) return;
    axios.get(`${process.env.REACT_APP_API_URL}/user-role/datatable/${params.id}?limit=10&offset=0`)
    .then(({data}) => {
      setDatatable(prev => ({
        ...prev,
        ...data.widget_data,
        t_head: prev.t_head,
        order_col: prev.order_col,
      }));
    })
    .catch(() => {})
  }, [params.id, stateSubmitted])

  return (
    <>
      <Card title="Role Access List">
        <Datatable {...datatable} add_btn={false} serverside={true} />
      </Card>
    </>
  )
}

export default UserRoleList