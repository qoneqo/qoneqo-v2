import React, { useState, useContext } from 'react';
import axios from 'axios';
import Context from '../../../views/Context';
import { useNavigate } from 'react-router';
import Card from '../../../components/Card';
import Form from '../../../components/Form';
import Section from '../../../components/Section';
import Title from '../../../components/Title';
import { QConfirm, QAlert } from '../../../components/Alerts';
import BackNavigate from '../../../components/BackNavigate';

const CreateApps = (props) => {
  const { setContext } = useContext(Context);
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: '',
    logo: '',
    type: 'app',
  })

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const submit = () => {
      axios
      .post(`${process.env.REACT_APP_API_URL}/apps`, state)
      .then(({data}) => {
        setContext(prev => ({...prev, appsList: [...prev.appsList, data]}));
        /**
         * To trigger reset token, because apps list got added
         */
        axios
          .post(`${process.env.REACT_APP_API_URL}/auth/reset`)
          .then(() => {
            QAlert({title: 'Success', message: 'Action Success!'})
            navigate('/dashboard/apps');
          })
          .catch(() => {
            QAlert({title: 'Error', message: 'Action Error!'})
          })
      })
      .catch(() => {})
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
      <Title><BackNavigate to="/dashboard/apps" /> Apps</Title>
      <Section>
        <Card title="Create Apps">
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
              <Form.Button type="submit">Create</Form.Button>
            </div>
          </Form>
        </Card>
      </Section>
    </>
  );
};

export default CreateApps;
