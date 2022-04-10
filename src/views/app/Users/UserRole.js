import React, {useState} from 'react';
import AddRemoveRoles from './AddRemoveRoles';
import UserRoleList from './UserRoleList';

const UserRole = ({params}) => {
  const [stateSubmitted, setStateSubmitted] = useState(false);

  return (
    <div>
      <AddRemoveRoles
        params={params}
        stateSubmitted={[stateSubmitted, setStateSubmitted]}
      />
      <UserRoleList
        params={params}
        stateSubmitted={[stateSubmitted, setStateSubmitted]}
      />
    </div>
  );
}

export default UserRole