const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");
const contacts = path.join(__dirname, "contacts.json");

const loadContacts = async () => {
  const data = await fs.readFile(contacts);
  const json = data.toString();
  return JSON.parse(json);
};

const saveContacts = async (data) => {
  await fs.writeFile(contacts, JSON.stringify(data));
};

const listContacts = async () => {
  // Повертає масив контактів.
  try {
    const data = await loadContacts();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const data = await loadContacts();
    const user = data.find((contact) => String(contact.id) === contactId) || null;
    if (user === null) {
      return console.log("There no user with this Id");
    }
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const data = await loadContacts();

    const userIdIndex = data.findIndex((contact) => String(contact.id) === contactId);
    if (userIdIndex === -1) {
      return console.log("There no user with this Id");
    }
    const updateData = data.splice(userIdIndex, 1);
    await saveContacts(data);

    return updateData;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  // Повертає об'єкт доданого контакту.
  try {
    const newUser = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    const data = await loadContacts();
    data.push(newUser);
    await saveContacts(data);

    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
};
