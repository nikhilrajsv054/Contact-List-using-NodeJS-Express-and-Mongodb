const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }

})


const Contact = mongoose.model('Contact', contactSchema); // While creating a model name always use Capital letter, eg: Contact

module.exports = Contact;