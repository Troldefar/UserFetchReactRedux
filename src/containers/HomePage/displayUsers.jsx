import { createSelector } from 'reselect';
import { makeSelectUsers } from './selectors';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const UsersContainers = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const UserImage = styled.div`
  height: 2rem;
  width: 2rem;
  img {
    height: 100%;
    width: 100%;
  }
`;

const UserDetails = styled.h3`
  font-size: 20px;
  font-weight: 300;
  color: #000;
  margin: 0;
`;

const stateSelector = createSelector(makeSelectUsers, (users) => ({
  users
}));

const DisplayUsers = (props) => {
  const { users } = useSelector(stateSelector);

  const history = useHistory();

  const viewSingleUser = (id) => {
    history.push(`/user/${id}`);
  }
  
  const arrayLengthCheck = !users || (users && users.length === 0);

  if(arrayLengthCheck) return null;

  return <UsersContainers>
    { users.map((user, index) => (
      <UserContainer 
        key={index}
        onClick={() => {
          viewSingleUser(user.id);
        }}
      >
        <UserImage>
          <img alt={user.first_name} src={user.avatar} />
        </UserImage>
        <UserDetails>
          { user.first_name } | { user.last_name }
        </UserDetails>
      </UserContainer>
    ))}
  </UsersContainers>
}

export default DisplayUsers;