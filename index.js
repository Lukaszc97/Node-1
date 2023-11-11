const { Command } = require("commander");
const program = new Command();
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await listContacts();
        console.log('Lista kontaktów:', allContacts);
        break;

      case "get":
        const specificContact = await getContactById(id);
        console.log('Kontakt o ID:', specificContact);
        break;

      case "add":
        const newContact = await addContact(name, email, phone);
        console.log('Dodano nowy kontakt:', newContact);
        break;

      case "remove":
        const remainingContacts = await removeContact(id);
        console.log('Usunięto kontakt o ID:', id);
        console.log('Aktualna lista kontaktów:', remainingContacts);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error('Wystąpił błąd:', error.message);
  }
}

invokeAction(argv);
