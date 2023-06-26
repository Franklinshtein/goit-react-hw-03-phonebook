import React, { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm/ContactForm';
import Filter from '../components/Filter/Filter';
import ContactList from '../components/ContactList/ContactList';
import styles from '../components/App.module.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const notyf = new Notyf();

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    const isDuplicateName = contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    const isDuplicateNumber = contacts.some(
      (contact) => contact.number === newContact.number
    );

    if (isDuplicateName) {
      notyf.error(`${newContact.name} is already in the phonebook.`);
      return;
    }

    if (isDuplicateNumber) {
      notyf.error(`${newContact.number} is already in the phonebook.`);
      return;
    }

    setContacts([...contacts, newContact]);
    notyf.success('Contact added successfully!');
  };

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    notyf.success('Contact deleted successfully!');
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.contact_list}>
      <h1 className={styles.phonebook}>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} className={styles.form} />
      <h2 className={styles.segment}>Contacts</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
}

export default App;
