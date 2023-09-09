const path = require("path");
const contacts = require("./db/contacts");

// console.log(contacts);
//listContacts();
// getContactById("AeHIrLTr6JkxGE6SN-0Rw");
// removeContact("AeHIrLTr6JkxGE6SN-0Rw");
// addContact("Bob Snail", "bobby@gmail.com", "56667-3434-34343");

const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContacts = await contacts.listContacts();
      return console.table(listContacts);
    case "get":
      const getContactById = (await contacts.getContactById(id)) || null;
      return console.table(getContactById);

    case "add":
      const addContact = await contacts.addContact(name, email, phone);
      return console.table(addContact);

    case "remove":
      const removeContact = (await contacts.removeContact(id)) || null;
      return console.table(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type");
  }
};

invokeAction(argv);
