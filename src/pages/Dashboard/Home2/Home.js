import React, { useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import Center from '../../../components/UI/Center/Center';
import classes from './Home.module.css';

const Home = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Center>
      <h1 className={classes['welcome-text']}>Welcome, {authCtx.userName}!</h1>
    </Center>
  );
};

export default Home;
