const express = require('express');
const cowsay = require('cowsay');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');

// Create the server using express
const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Loads keys based on production deploy or localhost
var db;
var env = process.env.NODE_ENV || 'dev';
console.log("Starting up the server in " + env + " mode");
switch (env) {
	case 'dev':
		db = require('./config/keys').mongoURI; // our access key for the database
		break;
	case 'production':
		db = process.env.mongoURI;
		break;
}

// Connect to Mongo
mongoose
	.connect(String(db), { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected!'))
	.catch(err => console.log(err));

// Import the routes
const routes = require('./routes');

// User APIs
app.post('/api/user/login', routes.postUserLogin);
app.post('/api/user/register', routes.postUserRegister);
app.post('/api/user/logout', routes.postUserLogout);

// Contacts APIs
app.post('/api/contacts/getallcontacts/:userID', routes.postContactsGetAllContacts);
app.post('/api/contacts/add/:userID', routes.postContactsAdd);
app.post('/api/contacts/delete/:id', routes.postContactsDelete);
app.post('/api/contacts/update/:id', routes.postContactsUpdate);

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
