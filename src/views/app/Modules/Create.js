import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from '../../../views/Context';
import { useNavigate } from 'react-router';
import Card from '../../../components/Card';
import Form from '../../../components/Form';
import Section from '../../../components/Section';
import Title from '../../../components/Title';
import { QConfirm, QAlert } from '../../../components/Alerts';
import BackNavigate from '../../../components/BackNavigate';

const CreateModules = (props) => {
  const { context } = useContext(Context);

  const navigate = useNavigate();
  const [state, setState] = useState({
    name: '',
    path: '',
    method: '',
    parent_id: '',
    app_id: '',
  })
  const [moduleList, setModuleList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/modules`)
      .then(({data}) => {
        setModuleList(data);
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
      .post(`${process.env.REACT_APP_API_URL}/modules`, state)
      .then(({data}) => {
        QAlert({title: 'Success', message: data.message, messageType: data.messageType})
        navigate('/dashboard/modules');
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
      <Title><BackNavigate to="/dashboard/modules" /> Modules</Title>
      <Section>
        <Card title="Create Modules">
          <Form onSubmit={handleSubmitForm}>
            <div className="grid grid-cols-3 gap-4">
              <Form.Group>
                <Form.Label htmlFor="name">Module</Form.Label>
                <Form.Input
                  id="name"
                  placeholder="Module"
                  value={state.name}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="path">Path</Form.Label>
                <Form.Input
                  id="path"
                  placeholder="/Path"
                  value={state.path}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, path: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="method">Method</Form.Label>
                <Form.Select
                  value={state.method}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, method: e.target.value }))
                  }
                >
                  <option value={'GET'}>GET</option>
                  <option value={'POST'}>POST</option>
                  <option value={'PUT'}>PUT</option>
                  <option value={'DELETE'}>DELETE</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="parent_id">Parent Module</Form.Label>
                <Form.Select
                  value={state.parent_id}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, parent_id: e.target.value }))
                  }
                >
                  <option value={null}>Parent</option>
                  {
                    moduleList.map((value, index) => (
                      <option key={`module-list-${index}`} value={value.id}>{value.module}</option>
                    ))
                  }
                </Form.Select>
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
              <Form.Button type="submit">Create</Form.Button>
            </div>
          </Form>
        </Card>
      </Section>
    </>
  )
}

export default CreateModules