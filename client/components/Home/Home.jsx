import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import UserSection from '../UserSection/UserSection';
import SignUpOrLogin from './SignUpOrLogin';
import {
  checkCurrentToken,
  setIsLoggedIn,
} from '../../store/entities/userEntity';

const Home = ({ isLoggedIn }) => {
  const userId = useSelector((state) => state.users.user.id);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkToken = async () => {
      const tokenResponse = await dispatch(checkCurrentToken());
      if (!tokenResponse) return dispatch(setIsLoggedIn(false));
      return dispatch(setIsLoggedIn(true));
    };

    checkToken();
  }, []);

  return <>{isLoggedIn ? <UserSection /> : <SignUpOrLogin />}</>;
};

const mapStateToProps = ({ users: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(Home);
