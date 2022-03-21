import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { QAlert, QConfirm } from '../../../components/Alerts';
import Card from '../../../components/Card';
import Form from '../../../components/Form';
import BackNavigate from '../../../components/BackNavigate';
import Section from '../../../components/Section';
import Title from '../../../components/Title';

const EditApps = (props) => {
  const navigate = useNavigate();  
  const params = useParams();
  const [state, setState] = useState({
    id: null,
    name: '',
    logo: '',
    type: 'app',
  })

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/apps/${params.id}`, state)
    .then(({data}) => {
      setState((prev) => ({
        ...prev,
        id: data.id,
        name: data.name,
        logo: data.logo,
        type: data.type
      }))
    })
    .catch(() => {})
  }, [])

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const submit = () => {
      axios
      .put(`${process.env.REACT_APP_API_URL}/apps/${params.id}`, state)
      .then(({data}) => {
        navigate('/dashboard/apps');        
      })
      .catch(() => {})
    }

    QConfirm({
      confirmed: {
        yes: () => {
          submit();
          QAlert({title: 'Success', message: 'Action Success!'});
        },
        cancel: () => {
          QAlert({title: 'Canceled', message: 'Action Canceled!'})
        }
      }
    });

  }

  return (
    <>      
      <Title><BackNavigate to="/dashboard/apps" /> Apps</Title>
      <Section>
        <Card title="Edit Apps">
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
                <Form.Label htmlFor="logo">Logo</Form.Label>
                <Form.Input
                  className="cursor-pointer"
                  id="logo"
                  placeholder="Type"
                  value={state.logo}
                  type="file"
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, logo: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="type">Type</Form.Label>
                <Form.Select
                  value={state.type}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, type: e.target.value }))
                  }
                >
                  <option value="app">app</option>
                  <option value="web">web</option>
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

export default EditApps