

const express = require("express"); // Importing the Express module to this file
const path = require("path"); // Importing the Path module to handle file paths
const port = 8000; // Setting the port for the server

//This line of code is required to import the 'mongoose' module from the './config/mongoose' file, 
//which is necessary for connecting to a MongoDB database using the Mongoose library.
const db = require('./config/mongoose'); 
// This line imports the 'Contact' model from the './models/contact' file and assigns it to the 'Contact' variable.
const Contact = require('./models/contact');

const app = express(); // Creating an instance of the Express application

app.set("view engine", "ejs"); // Setting the view engine as EJS (Embedded JavaScript)
app.set("views", path.join(__dirname, "views")); // Setting the views directory path as '/views'
app.use(express.urlencoded()); // sets up middleware in an Express.js app to parse incoming request bodies with URL-encoded payloads, allowing access to data submitted by the client.

//to access the static file - here we are accessing the css file inside the assests folder
app.use(express.static('assests'));

var contactList =[
    {
        name: 'Aditya',
        phone: "788945454544"

    },
    {
        name: 'Aditi',
        phone: "78894590"
    },
    {
        name: 'Adit Narayan',
        phone: "89894590"
    }
]


// app.get('/', function(req, res){ // GET request handler for the root route ('/') of the web application.
//   Contact.find({})               // 'find' method of the 'Contact' model to retrieve all contacts from the database.
//     .then(function(contacts){    // This code block is executed when the 'find' operation is successful.
//       return res.render('home',{ // code renders a view called 'home' and passes it the contacts retrieved from the database.
//           title: "Contact List",
//           contact_list: contacts
//       });
//     })
//     .catch(function(err){
//       console.log("error in fetching contacts from db: " + err);
//       return;
//     });
// });


app.get('/', async function(req, res){ 
  try {
    const contacts = await Contact.find({});
    res.render('home',{
      title: "Contact List",
      contact_list: contacts
    });
  } catch (err) {
    console.log("error in fetching contacts from db: " + err);
    return;
  }
});


app.get("/practice", (req, res) => {
  return res.render("practice", {
    title: "Let us play with EJS",
  });
});

app.post('/create-contact', async (req, res) => {
  try {
    const contact = await Contact.create({ name: req.body.name, phone: req.body.phone });
    console.log("created contact:", contact);
    return res.redirect('back');
  } catch (err) {
    console.error(err);
    return res.status(500).send("Could not create contact");
  }
});


app.get('/delete-contact/', async function(req, res) {
  console.log(req.query);
  let id = req.query.id;

  try {
    await Contact.findOneAndDelete({ _id: id }).exec();
    return res.redirect('back');
  } catch (err) {
    console.log('error in deleting the object');
    return;
  }
});


app.listen(port, (err) => {
  // Listening to the defined port number
  if (err) {
    console.log("error!"); // Log an error message to the console if there is an error starting the server
  }
  console.log("Servess express is running"); // Log a message to the console once the server has started successfully
});