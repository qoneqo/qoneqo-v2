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
import UserRole from './UserRole';

const EditUsers = (props) => {
  const { context, setContext } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    identifier: '',
    password: '',
    email: '',
    name: '',
    is_active: '1',
    app_id: '',
  })

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/users/${params.id}`, state)
    .then(({data}) => {
      setState((prev) => ({
        ...prev,
        identifier: data.identifier,
        email: data.email,
        name: data.name,
        is_active: data.is_active,
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
      .put(`${process.env.REACT_APP_API_URL}/users/${params.id}`, state)
      .then(({data}) => {
        axios.get(`${process.env.REACT_APP_API_URL}/users/me`)
          .then(({data}) => {
            setContext(prevContext => ({
              ...prevContext,
              userId: data.id,
              userName: data.name,
            }))
            QAlert({title: 'Success', message: data.message, messageType: data.messageType})
            navigate('/dashboard/users');
          })
          .catch(() => {
            QAlert({title: 'Error', message: 'Action Error!'})
          });
      })
      .catch(({response: {data}}) => {
        QAlert({title: 'Error', message: data.message, messageType: data.messageType})
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
      <Title><BackNavigate to="/dashboard/users" /> Users</Title>
      <Section>
        <Card title="Edit Users">
        <Form onSubmit={handleSubmitForm}>
            <div className="grid grid-cols-3 gap-4">
              <Form.Group>
                <Form.Label htmlFor="identifier">Username</Form.Label>
                <Form.Input
                  id="identifier"
                  placeholder="Username"
                  value={state.identifier}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, identifier: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Input
                  id="password"
                  type="password"
                  value={state.password}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </Form.Group>
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
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Input
                  id="email"
                  placeholder="Email"
                  value={state.email}
                  type="email"
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="is_active">Is Active</Form.Label>
                <Form.Select
                  value={state.is_active}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, is_active: e.target.value }))
                  }
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="flex justify-end">
              <Form.Button type="submit">Update</Form.Button>
            </div>
          </Form>
        </Card>
      </Section>

      <Section className="grid grid-cols-1 gap-4">
        <UserRole params={params} />
      </Section>
    </>
  )
}

export default EditUsers