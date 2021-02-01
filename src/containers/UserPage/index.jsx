import axios from "axios";
import { useParams } from "react-router-dom";
import { setUser } from './actions';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { createSelector } from 'reselect';
import { makeSelectUser } from './selectors';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const OuterUserContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const stateSelector = createSelector(makeSelectUser, (user) => ({
  user
}))

const actionDispatch = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
})

export function UserPage(props) {

  const { user } = useSelector(stateSelector);
  const { setUser } = actionDispatch(useDispatch());
  const { id } = useParams();
  const fetchUser = async (id) => {
    const response = await axios.get(`https://reqres.in/api/users/${id}`).catch((error) => {
      console.log(error);
    })
    if(response) setUser(response.data.data);
  }

  useEffect(() => {
    if(id && id !== '') {
      fetchUser(id);
    }
  }, [id]);

  if(!user) return <div>
    No user found
  </div>

  return <OuterUserContainer>
    <UserImage>
      <img alt={user.first_name} src={user.avatar} />
    </UserImage>
    <UserDetails>
      { user.first_name }
    </UserDetails>
  </OuterUserContainer>
}