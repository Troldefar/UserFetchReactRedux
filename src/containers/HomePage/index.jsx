import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectUsers } from './selectors';
import axios from 'axios';
import { setUsers } from './actions';
import DisplayUsers from './displayUsers';

const stateSelector = createSelector(makeSelectUsers, (users) => ({
  users
}));

const actionDispatcher = (dispatch) => ({
  setUsers: (users) => dispatch(setUsers(users))
});

export function HomePage(props) {
  const { users } = useSelector(stateSelector);
  const { setUsers } = actionDispatcher(useDispatch())
  const fetchUsers = async () => {
    const response = await axios.get('https://reqres.in/api/users').catch((err) => {
      console.log(err);
    });
    setUsers(response.data.data);
  }
  useEffect(() => {
    fetchUsers();
  }, [])
  console.log(users);
  return (
    <div>
      <DisplayUsers />
    </div>
  )
}