import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactForm from './ContactForm';
import withContactState from '../withContactState';
import '../css/ContactManager.css';

const ContactManager = ({ contacts, addContact, updateContact, deleteContact }) => {
    const navigate = useNavigate();
    const [currentContact, setCurrentContact] = useState(null);

    const handleView = (id) => {
        navigate(`/contact-detail/${id}`);
    };

    const handleUpdate = (contact) => {
        setCurrentContact(contact);
    };

    return (
        <div className="contact-manager">
            <ContactForm
                addContact={addContact}
                updateContact={updateContact}
                currentContact={currentContact}
                setCurrentContact={setCurrentContact}
            />
            <div className='box2'>
                <h1>Contact List</h1>
                <table className="contact-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(contacts) && contacts.map(contact => (
                            <tr key={contact.id}>
                                <td>{contact.id}</td>
                                <td>{contact.name}</td>
                                <td><a href={`mailto:${contact.email}`}>{contact.email}</a></td>
                                <td>{contact.contact}</td>
                                <td>
                                    <button className="view" onClick={() => handleView(contact.id)}>View</button>
                                    <button className="update" onClick={() => handleUpdate(contact)}>Update</button>
                                    <button className="delete" onClick={() => deleteContact(contact.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default withContactState(ContactManager);
