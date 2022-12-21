const {addMessage, getAllMessage} = require("../Controllers/MessagesController");
const router = require('express').Router();

router.post('/addMessage', addMessage)

router.post('/getMessage', getAllMessage)

module.exports = router