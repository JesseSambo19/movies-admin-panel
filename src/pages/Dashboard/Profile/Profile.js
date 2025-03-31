import React from 'react';
import ProfileInformation from './components/ProfileInformation/ProfileInformation';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import DeleteAccount from './components/DeleteAccount/DeleteAccount';

const Profile = () => {
  return (
    <React.Fragment>
      <div>
        <center>
          <h1 style={{ color: 'white' }}>Profile</h1>
        </center>
      </div>
      <ProfileInformation />
      <UpdatePassword />
      <DeleteAccount />
    </React.Fragment>
  );
};

export default Profile;
