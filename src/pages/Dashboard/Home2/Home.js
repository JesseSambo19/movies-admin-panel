import React from 'react';
import { useAuth } from '../../../store/auth-context';
import Center from '../../../components/UI/Center/Center';
import classes from './Home.module.css';

const Home = () => {
  const authCtx = useAuth();
  return (
    <Center>
      <div className={classes.home}>
        <center>
          <h1 className={classes['welcome-text']}>
            Welcome, {authCtx.userName}!
          </h1>
          <p className={classes.subtitle}>
            Start managing your movie collection with ease.
          </p>
        </center>
      </div>
    </Center>
  );
};

export default Home;
