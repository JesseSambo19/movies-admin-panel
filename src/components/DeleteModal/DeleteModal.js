import React from 'react';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
// import classes from './DeleteModal.module.css';

const DeleteModal = (props) => {
  const doNothing = () => {};
  return (
    <div>
      {props.showModal && (
        <Modal onClose={props.isLoading ? doNothing : props.onClose}>
          <div style={{ backgroundColor: 'white' }}>
            <p style={{ textAlign: 'center' }}>
              {props.isLoading ? 'Deleting...' : props.text}
            </p>
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <Button
                disabled={props.isLoading}
                onClick={props.onDelete}
              >
                Ok
              </Button>
              <Button
                disabled={props.isLoading}
                onClick={props.onClose}
              >
                Cancel
              </Button>
            </span>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeleteModal;
