import React from 'react';
import styles from '../ContactList/ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.name} - {contact.number}
          <button className={styles.delete_btn} onClick={() => deleteContact(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  del: PropTypes.func.isRequired,
};
ContactList.defaultProps = {
  contacts: [],
};

export default ContactList;
