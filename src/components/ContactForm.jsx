import React, { useState, useEffect } from 'react';
import '../css/ContactForm.css';

const ContactForm = ({ addContact, updateContact, currentContact, setCurrentContact }) => {
    const [form, setForm] = useState({ name: '', email: '', contact: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentContact) {
            setForm(currentContact);
        } else {
            setForm({ name: '', email: '', contact: '' });
        }
    }, [currentContact]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = 'Name is required';
        if (!form.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!form.contact) {
            newErrors.contact = 'Contact is required';
        } else if (!/^\d+$/.test(form.contact)) {
            newErrors.contact = 'Contact must be numeric';
        }
        return newErrors;
    };

    const handleAddUpdate = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (currentContact) {
            updateContact({ id: currentContact.id, ...form });
        } else {
            addContact(form);
        }
        setForm({ name: '', email: '', contact: '' });
        setCurrentContact(null);
        setErrors({});
    };

    return (
        <div className='box'>
            <h1>{currentContact ? 'Update Contact' : 'New Contact'}</h1>
            <div className="contact-form">
                <div className="form-group">
                    <label>
                        Name
                        <input type="text" name="name" value={form.name} onChange={handleInputChange} />
                    </label>
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>
                        Email
                        <input type="text" name="email" value={form.email} onChange={handleInputChange} />
                    </label>
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>
                        Contact
                        <input type="text" name="contact" value={form.contact} onChange={handleInputChange} />
                    </label>
                    {errors.contact && <span className="error">{errors.contact}</span>}
                </div>
                <div className="form-group">
                    <button className="btn-add-update" onClick={handleAddUpdate}>
                        {currentContact ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;


