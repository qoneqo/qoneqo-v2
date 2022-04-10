import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from '../../../views/Context';
import { useNavigate, useParams } from 'react-router'
import Card from '../../../components/Card';
import Section from '../../../components/Section';
import Title from '../../../components/Title';
import Form from '../../../components/Form';
import { QConfirm, QAlert } from '../../../components/Alerts';
import BackNavigate from '../../../components/BackNavigate';

const EditRoles = (props) => {
  const { context, setContext } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: '',
    app_id: '',
  })

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/roles/${params.id}`, state)
    .then(({data}) => {
      setState((prev) => ({
        ...prev,
        name: data.name,
      }))
    })
    .catch(() => {})
  }, [])

  useEffect(() => {
    if (!context?.appsList) return;
    setState(prev => ({...prev, app_id: context.appListSelected?.id ? context.appListSelected.id : context.appsList[0].id}))
  }, [context])

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const submit = () => {
      axios
      .put(`${process.env.REACT_APP_API_URL}/roles/${params.id}`, state)
      .then(({data}) => {
        axios.get(`${process.env.REACT_APP_API_URL}/roles/me`)
          .then(({data}) => {
            setContext(prevContext => ({
              ...prevContext,
              userId: data.id,
              userName: data.name,
            }))
            QAlert({title: 'Success', message: 'Action Success!'})
            navigate('/dashboard/roles');
          })
          .catch(() => {
            QAlert({title: 'Error', message: 'Action Error!'})
          });
      })
      .catch(() => {
        QAlert({title: 'Error', message: 'Action Error!'})
      })
    }

    QConfirm({
      confirmed: {
        yes: () => {
          submit();
        },
        cancel: () => {
          QAlert({title: 'Canceled', message: 'Action Canceled!'})
        }
      }
    });
    
  }
  
  return (
    <>      
      <Title><BackNavigate to="/dashboard/roles" />Roles</Title>
      <Section>
        <Card title="Edit Roles">
        <Form onSubmit={handleSubmitForm}>
            <div className="grid grid-cols-3 gap-4">
              <Form.Group>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Input
                  id="name"
                  placeholder="Name"
                  value={state.name}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="app_id">App</Form.Label>
                <Form.Select
                  value={state.app_id}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, app_id: e.target.value }))
                  }
                >
                  {
                    context.appsList?.map((value, index) => (
                      <option key={`default-app-${index}`} value={value.id} >{value.name}</option>
                    ))
                  }
                </Form.Select>
              </Form.Group>
            </div>
            <div className="flex justify-end">
              <Form.Button type="submit">Update</Form.Button>
            </div>
          </Form>
        </Card>
      </Section>
    </>
  )
}

export default EditRoles