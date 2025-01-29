import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setContact } from '../actions';
import NotFound from './NotFound';
import '../css/ContactDetail.css'

const ContactDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts);
    let contact = contacts.find(contact => contact.id === parseInt(id));

    useEffect(() => {
        const fetchContact = async () => {
            if (!contact) {
                try {
                    const response = await fetch(`/contacts/${id}.json`);
                    const data = await response.json();
                    dispatch(setContact(data));
                } catch (error) {
                    console.error('Error fetching contact:', error);
                }
            }
        };

        fetchContact();
    }, [dispatch, contact, id]);

    contact = contacts.find(contact => contact.id === parseInt(id));

    if (!contact) {
        return <NotFound />;
    }

    return (
        <div className="contact-detail">
            <h2>Contact Details</h2>
            <p><strong>ID:</strong> {contact.id}</p>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Contact:</strong> {contact.contact}</p>
            <button onClick={() => window.history.back()}>&lt; Back</button>
        </div>
    );
};

export default ContactDetail;