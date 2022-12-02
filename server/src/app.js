const express = require('express');
const cors = require('cors');
const contactsService = require('./contactsService.js');
const departmentsService = require('./departmentsService.js');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/contacts/all', (req, res) => {
    const data = contactsService.getAll();
    const result = data.map((contacts) => {
        const department = departmentsService.getById(contacts.id);

        return {
            id: contacts.id,
            name: contacts.name,
            phone: contacts.phone,
            email: contacts.email,
            address: contacts.address,
            department: {
                id: department.id,
                name: department.name
            }
        };
    });
    res.json(result);
});

app.get('/api/contacts', (req, res) => {
    if (req.query.id === undefined) {
        res.status(400).send('Missing the query string parameter \'id\'!');
        // No point executing the remaining handler code so leave the function early
        return;
    }

    const id = parseInt(req.query.id);
    if (isNaN(id)) {
        res.status(400).send('The \'id\' parameter MUST be an integer value!');
        // No point executing the remaining handler code so leave the function early
        return;
    }
    
    const contact = contactsService.getById(id);

    if (contact !== null) {
        const department = departmentsService.getById(contact.departmentId);
        
        res.json({
            id:contact.id,
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            address: contact.address,
            departments: {
                id: department.id,
                name: department.name
            }
        });
    } else {
        res.status(404).send(`The contact with an id of ${id} could not be found!`);
    }
});

app.post('/api/contacts', (req, res) => {
    // Code is optimistic and assumes the body will have all the necessary data
    const { name, phone, email, address, departmentId } = req.body;

    const contact= {
        id: 0,
        name: name,
        phone: phone,
        email: email,
        address: address,
        departmentId: departmentId
    };

    contactsService.addContact(contact);

    res.status(201);
    res.location(`/api/contacts?id=${contact.id}`);
    res.send();
});

app.put('/api/contacts', (req, res) => {
    const { id, name, phone, email, address, departmentId } = req.body;

    const contact = contactsService.getById(id);

    if (contact === null) {
        res.status(404).send(`The contact with an id of ${id} could not be found!`);
    } else {
        contact.name = name;
        contact.phone = phone;
        contact.email = email;
        contact.address = address;
        contact.departmentId = departmentId;

        contactsService.updateContact(contact);
        res.send();
    }
});

app.get('/api/departments', (req, res) => {
    const departments = departmentsService.getAll();

    res.json(departments);
});

app.listen(port, () => {
    console.log(`Contacts Directory API Server listening on port ${port}`);
});