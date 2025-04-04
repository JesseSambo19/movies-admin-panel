import React from 'react';
import classes from './Pagination.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../UI/Button/Button';

const Pagination = (props) => {
  const nextPage = () => {
    if (props.currentPage < props.lastPage) {
      props.onSetCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (props.currentPage > 1) {
      props.onSetCurrentPage((prevPage) => prevPage - 1);
    }
  };
  return (
    <center className={classes.pagination}>
      <Button
        onClick={prevPage}
        disabled={props.currentPage === 1}
      >
        <ChevronLeft size={20} />
      </Button>
      <span>
        Page {props.currentPage} of {props.lastPage}
      </span>
      <Button
        onClick={nextPage}
        disabled={props.currentPage === props.lastPage}
      >
        <ChevronRight size={20} />
      </Button>
    </center>
  );
};

export default Pagination;
