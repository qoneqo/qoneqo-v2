import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from '../../../components/Card';
import Form from '../../../components/Form';
import { QConfirm, QAlert } from '../../../components/Alerts';

const AddRemoveRoles = ({ params, stateSubmitted: [stateSubmitted, setStateSubmitted] }) => {
  const [stateAppsList, setStateAppsList] = useState([]);
  const [stateAppSelected, setStateAppSelected] = useState('');
  const [stateRolesList, setStateRolesList] = useState([]);
  const [stateUserRole, setStateUserRole] = useState({
    user_id: params?.id,
    role_id: '',
  });

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/apps`)
    .then(({data}) => {
      setStateAppSelected(data?.[0]?.id);
      setStateAppsList(data);
    })
    .catch(() => {})
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/roles/where-app?app_id=${stateAppSelected}`)
    .then(({data}) => {
      setStateRolesList(data);
      setStateUserRole((prev) => ({...prev, role_id: data?.[0]?.id || null}))
    })
    .catch(() => {})
  }, [stateAppSelected]);

  const handleSubmitFormUserRole = (e) => {
    e.preventDefault();
    const submit = () => {
      axios
      .post(`${process.env.REACT_APP_API_URL}/user-role`, stateUserRole)
      .then(({data}) => {
        QAlert({title: 'Success', message: 'Action Success!'})
        setStateSubmitted(prev => !prev);
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
  };

  return (
    <>
      <Card title="Add or Remove Roles">
        <Form onSubmit={handleSubmitFormUserRole}>
          <div className="grid grid-cols-3 gap-4">
            <Form.Group>
              <Form.Label htmlFor="app-selected">Select App</Form.Label>
              <Form.Select
                id="app-selected"
                value={stateAppSelected}
                onChange={(e) => setStateAppSelected((prev) => e.target.value)}
              >
                {stateAppsList.map((value) => (
                  <option key={`app-selected-${value.id}`} value={value.id}>
                    {value.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="role-access">Role Access</Form.Label>
              <Form.Select
                id="role-access"
                value={stateUserRole.role_id}
                onChange={(e) =>
                  setStateUserRole((prev) => ({
                    ...prev,
                    role_id: e.target.value,
                  }))
                }
              >
                {stateRolesList.length ? (
                  stateRolesList.map((value) => (
                    <option key={`role-access-${value.id}`} value={value.id}>
                      {value.name}
                    </option>
                  ))
                ) : (
                  <option key={`role-access-0`} value={null}>
                    No Data
                  </option>
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="flex justify-end w-full">
              <Form.Button type="submit">Give Role Access </Form.Button>
            </Form.Group>
          </div>
        </Form>
      </Card>
    </>
  );
}

export default AddRemoveRoles