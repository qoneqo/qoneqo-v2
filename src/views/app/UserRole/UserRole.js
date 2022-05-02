import React, {useState} from 'react';
import { useParams } from 'react-router';
import BackNavigate from '../../../components/BackNavigate';
import Section from '../../../components/Section';
import Title from '../../../components/Title';
import AddRemoveRoles from './AddRemoveRoles';
import UserRoleList from './UserRoleList';

const UserRole = () => {
  const [stateSubmitted, setStateSubmitted] = useState(false);
  const params = useParams();

  return (
    <div>
      <Title><BackNavigate to="/dashboard/user-role" /> User Role</Title>
      <Section>
        <AddRemoveRoles
          params={params}
          stateSubmitted={[stateSubmitted, setStateSubmitted]}
        />
        <UserRoleList
          params={params}
          stateSubmitted={[stateSubmitted, setStateSubmitted]}
        />
      </Section>
    </div>
  );
}

export default UserRole