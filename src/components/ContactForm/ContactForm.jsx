import React, { useState } from 'react';
import styles from '../ContactForm/ContactForm.module.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const ContactForm = ({ addContact, contacts, className }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const notyf = new Notyf();

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingContactByName = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    const existingContactByNumber = contacts.find(
      (contact) => contact.number === number
    );

    if (existingContactByName) {
      notyf.error(`${name} is already in the phonebook.`);
      return;
    }

    if (existingContactByNumber) {
      notyf.error(`${number} is already in the phonebook.`);
      return;
    }

    const newContact = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      number,
    };

    addContact(newContact);
    setName('');
    setNumber('');

    notyf.success('Contact added successfully!');
  };

  return (
    <form className={styles.input_group} onSubmit={handleSubmit}>
      <input
        className={styles.input_form}
        type="text"
        name="name"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={styles.input_form}
        type="tel"
        name="number"
        placeholder="Enter phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
      />
      <button className={styles.add_contact} type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
