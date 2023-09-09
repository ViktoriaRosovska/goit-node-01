const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");
const contacts = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  // ...твій код. Повертає масив контактів.
  try {
    const data = await fs.readFile(contacts);
    const allContacts = JSON.parse(data);
    return allContacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const data = await fs.readFile(contacts);
    const res = JSON.parse(data);
    const user = res.find((contact) => contact.id === contactId) || null;
    if (user === null) {
      return console.log("There no user with this Id");
    }
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const data = await fs.readFile(contacts);
    const res = JSON.parse(data);

    const userIdIndex = res.findIndex((contact) => contact.id === contactId);
    if (userIdIndex === -1) {
      return console.log("There no user with this Id");
    }
    const updateData = res.splice(userIdIndex, 1);
    await fs.writeFile(contacts, JSON.stringify(res));

    return updateData;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  // ...твій код. Повертає об'єкт доданого контакту.
  try {
    const data = await fs.readFile(contacts);
    const res = JSON.parse(data);
    const newUser = {
      name,
      email,
      phone,
      id: nanoid(),
    };

    await fs.writeFile(contacts, `${JSON.stringify([...res, newUser])}`);
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
