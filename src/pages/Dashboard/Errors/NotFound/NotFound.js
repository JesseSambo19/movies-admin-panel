import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../components/UI/Button/Button';
import Center from '../../../../components/UI/Center/Center';
import Card from '../../../../components/UI/Card/Card';

const NotFoundPage = () => {
  return (
    <Center>
      <Card>
        <h1>404 | Page Not Found</h1>
        <center>
          <Link to={'/home'}>
            <Button>Go Back Home</Button>
          </Link>
        </center>
      </Card>
    </Center>
  );
};

export default NotFoundPage;
