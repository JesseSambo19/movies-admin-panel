import React from 'react';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
// import classes from './DeleteModal.module.css';

const DeleteModal = (props) => {
  return (
    <div>
      {props.showModal && (
        <Modal onClose={props.onClose}>
          <div style={{ backgroundColor: 'white' }}>
            <p style={{ textAlign: 'center' }}>{props.text}</p>
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <Button onClick={props.onDelete}>Ok</Button>
              <Button onClick={props.onClose}>Cancel</Button>
            </span>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeleteModal;
