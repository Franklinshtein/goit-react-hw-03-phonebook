import React from 'react';
import styles from '../Filter/Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ filter, setFilter }) => {
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <input className={styles.input_form}
      type="text"
      name="filter"
      placeholder="Search contacts"
      value={filter}
      onChange={handleChange}
    />
  );
};

Filter.propTypes = {
  setFilterToState: PropTypes.func.isRequired,
};
export default Filter;