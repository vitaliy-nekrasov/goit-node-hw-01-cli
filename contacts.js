const fs = require("fs").promises;
const path = require("path");
require("colors");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.log(data);
    console.log("You have successfully uploaded your contact list".green);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = await JSON.parse(data);
    const contactById = await contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    console.log(contactById);
    console.log(
      `You have successfully uploaded contact with id = ${contactId}`.green
    );
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = await JSON.parse(data);
    const getContacts = await contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    fs.writeFile(contactsPath, JSON.stringify(getContacts), "utf-8");
    console.log(getContacts);
    console.log(
      `You have successfully remove contact with id = ${contactId}`.green
    );
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = await JSON.parse(data);

    if (contacts.map((contact) => contact.name).includes(name)) {
      console.log(`Sorry, this contact already exists`.red);
      return;
    }

    const newContact = {
      id: (Number(contacts[contacts.length - 1].id) + 1).toString(),
      name,
      email,
      phone: phone.toString(),
    };

    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
    console.log(contacts);
    console.log(
      `You have successfully add contact ${name} with id = ${newContact.id}`
        .green
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
