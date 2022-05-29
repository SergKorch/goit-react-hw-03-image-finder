import React from 'react';
// import PropTypes from 'prop-types';
import s from './button.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={s.Button} type="button" onClick={onClick}>
    Load more
  </button>
  );
};

// ContactListItem.propTypes = {
//   id: PropTypes.string.isRequired,
//   nameContact: PropTypes.string.isRequired,
//   number: PropTypes.string.isRequired,
//   deleteContact: PropTypes.func.isRequired,
// };

export default Button;
