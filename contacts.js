const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactsParsed = await JSON.parse(contacts);
  const getContact = await contactsParsed.find(
    (contact) => contact.id === contactId.toString()
  );
  // console.log(getContact);
  return getContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactsParsed = await JSON.parse(contacts);
  const getContacts = await contactsParsed.filter(
    (contact) => contact.id !== contactId.toString()
  );
  const result = await fs.writeFile(
    contactsPath,
    JSON.stringify(getContacts),
    "utf-8"
  );
  console.log(result);
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contactsParsed = await JSON.parse(contacts);
  // console.log(Number(contactsParsed[contactsParsed.length - 1].id));
  const contact = {
    id: (Number(contactsParsed[contactsParsed.length - 1].id) + 1).toString(),
    name,
    email,
    phone: phone.toString(),
  };

  contactsParsed.push(contact);
  const result = await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsParsed),
    "utf-8"
  );
  console.log(result);
  // return contactsParsed;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
