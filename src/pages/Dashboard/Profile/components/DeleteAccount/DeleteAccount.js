import React, { useContext, useState } from 'react';
import Button from '../../../../../components/UI/Button/Button';
// import classes from './DeleteAccount.module.css';
import Card from '../../../../../components/UI/Card/Card';
import Modal from '../../../../../components/UI/Modal/Modal';
import ProfileContext from '../../../../../store/profile-context';

const DeleteAccount = () => {
  const profCtx = useContext(ProfileContext);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteAccount = () => {
    profCtx.onDeleteUserAccount(closeModal);
  };

  return (
    <React.Fragment>
      {showModal && (
        <Modal onClose={closeModal}>
          <div style={{ backgroundColor: 'white' }}>
            <p style={{ textAlign: 'center' }}>
              Are you sure you want to delete your account permanently?
            </p>
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <Button onClick={deleteAccount}>Yes</Button>
              <Button onClick={closeModal}>No</Button>
            </span>
          </div>
        </Modal>
      )}
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
