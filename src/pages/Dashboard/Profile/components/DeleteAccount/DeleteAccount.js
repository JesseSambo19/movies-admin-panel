import React, { useState } from 'react';
import Button from '../../../../../components/UI/Button/Button';
// import classes from './DeleteAccount.module.css';
import Card from '../../../../../components/UI/Card/Card';

import DeleteModal from '../../../../../components/DeleteModal/DeleteModal';
import useProfileApi from '../../../../../services/profile-api';

const DeleteAccount = () => {
  const { deleteUserAccount } = useProfileApi();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteAccount = () => {
    deleteUserAccount(closeModal);
  };

  return (
    <React.Fragment>
      <DeleteModal
        showModal={showModal}
        onClose={closeModal}
        text="Are you sure you want to delete your account permanently?"
        onDelete={deleteAccount}
      />
      <Card>
        <h3>Delete Account</h3>
        <p>
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Before deleting your account, please download any
          data or information that you wish to retain.
        </p>
        <Button
          onClick={openModal}
          style={{ backgroundColor: 'red', border: 'red' }}
        >
          DELETE ACCOUNT
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default DeleteAccount;
