const contactsData = require('./data/contacts.js');

function getAll() {
    return contactsData;
}

function getById(id) {
    for (const contact of contactsData) {
        if (contact.id === id) {
            return contact;
        }
    }

    return null;
}

function addContact(contact) {
    contact.id = getNextId();

    contactsData.push(contact);
}

function updateContact(contact) {
    const contactsIndex = contactsData.findIndex((c) => c.id === contact.id);
    if (contactsIndex != -1) {
        contactsData[contactsIndex] = contact;
    }
}


let lastId = 2;

function getNextId() {
    const nextId = lastId + 1;
    lastId = nextId;
    return nextId;
}

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.addContact = addContact;
module.exports.updateContact = updateContact;
