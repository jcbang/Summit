const express = require('express');
const router = express.Router();
const UserSession = require('../../models/UserSession');
const UserProfiles = require('../../models/UserProfiles');

// link: contacts

//localhost:5000/contacts/

// @route GET items
// @desc Get ALL Contacts
// @access Public

// todo: only authenticated users can access
router.get('/getAllContacts/:userID', (req, res) => {
	UserProfiles.find({ userID: req.params.userID })
		.then(contacts => res.json(contacts))
		.catch(err =>
			console.log('Oh no something went wrong in routes/api/contacts.js at router.get()!')
		);
});

// todo: only authenticated users can access
router.post('/add/:userID', (req, res) => {
	console.log("testing")
	console.log(req.params)
	const newContact = new UserProfiles({
		userID: req.params.userID,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		phone: req.body.phone,
		company: req.body.company,
		address: {
			street: req.body.address.street,
			city: req.body.address.city,
			state: req.body.address.state,
			zip: req.body.address.zip
		}
	});

	newContact.save().then(contact => res.json(contact));
});

// @route Delete api/contacts/:id
// @desc Delete an item
// @access Public
// todo: fix it : Anthony's code
/* COMMENTED OUT
router.delete('/:id', (req, res) => {
	// req.params.id fetches it from the URL
	// Also nested promises lol
	UserProfiles.findById(req.params.id)
		.then(contact => contact.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false, error: err })); // Return a 404 if you try to delete an item that doesnt exist
});
*/

module.exports = router;