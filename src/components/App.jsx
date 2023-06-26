import React, { Component } from 'react';
import ContactForm from '../components/ContactForm/ContactForm';
import Filter from '../components/Filter/Filter';
import ContactList from '../components/ContactList/ContactList';
import styles from '../components/App.module.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };
    this.notyf = new Notyf();
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (newContact) => {
    const { contacts } = this.state;
    const isDuplicateName = contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    const isDuplicateNumber = contacts.some(
      (contact) => contact.number === newContact.number
    );

    if (isDuplicateName) {
      this.notyf.error(`${newContact.name} is already in the phonebook.`);
      return;
    }

    if (isDuplicateNumber) {
      this.notyf.error(`${newContact.number} is already in the phonebook.`);
      return;
    }

    this.setState(
      (prevState) => ({
        contacts: [...prevState.contacts, newContact],
      }),
      () => {
        this.notyf.success('Contact added successfully!');
      }
    );
  };

  deleteContact = (id) => {
    this.setState((prevState) => {
      const updatedContacts = prevState.contacts.filter((contact) => contact.id !== id);
      return { contacts: updatedContacts };
    }, () => {
      this.notyf.success('Contact deleted successfully!');
    });
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={styles.contact_list}>
        <h1 className={styles.phonebook}>Phonebook</h1>
        <ContactForm
        addContact={this.addContact}
        contacts={contacts}
        className={styles.form}
      />
      <h2 className={styles.segment}>Contacts</h2>
      <Filter filter={filter} setFilter={this.handleFilterChange} />
      <ContactList contacts={filteredContacts} deleteContact={this.deleteContact} />
    </div>
  );
}
}

export default App;
