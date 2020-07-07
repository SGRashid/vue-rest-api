const express = require('express');
const app = express();
const path = require('path');
const {v4} = require('uuid');

let CONTACTS = [
    {id: v4(), name: 'Сергей', value: '8-800-2000-600', marked: false},
];

app.use(express.json())

// GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() => res.status(200).json(CONTACTS), 1000);
});

// POST
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false};
    CONTACTS.push(contact);
    res.status(201).json(contact);
});

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id);
    res.status(200).json({message: 'Contact was deleted'});
});

// PUT
app.put('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.map(c => c.id !== req.params.id ? c : req.body);
    res.status(200).json({message: 'Contact status was changed'});
});

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => console.log('Server has been started on port 3000...'));