const {register, login, setAvatar, getAllUsers} = require("../Controllers/UsersController");
const router = require('express').Router();

router.post('/register', register)
router.post('/login', login)
router.post('/setAvatar/:id',setAvatar)
router.get('/allUsers/:id',getAllUsers)

module.exports = router