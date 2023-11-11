const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, 'db', 'db.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const removedContact = contacts.find((c) => c.id === contactId);
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), 'utf8');
    return removedContact;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const newContact = { id: generateUniqueId(contacts), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8');
    return newContact;
  } catch (error) {
    throw error;
  }
}

function generateUniqueId(contacts) {
  let newId;
  do {
    newId = shortid.generate();
  } while (contacts.some(contact => contact.id === newId));

  return newId;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
