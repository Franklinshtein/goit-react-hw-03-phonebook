import React from 'react';
import styles from '../Filter/Filter.module.css';

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

export default Filter;
