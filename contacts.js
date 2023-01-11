const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    // console.log(data);
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
  return getContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactsParsed = await JSON.parse(contacts);
  const getContacts = await contactsParsed.filter(
    (contact) => contact.id !== contactId.toString()
  );
  console.log(getContacts);
}

async function addContact(name, email, phone) {
  const contact = {
    id: "12",
    name,
    email,
    phone: phone.toString(),
  };
  const contacts = await listContacts();
  const contactsParsed = await JSON.parse(contacts);
  contactsParsed.push(contact);
  return contactsParsed;
}

console.log(addContact("vlad", "vlad@mainModule.com", 09833322));
