const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController.js');

router.get('/', usersController.getUsers);
router.post('/', usersController.createUsers);
router.delete('/deleteAll', usersController.deleteAllUsers);

router.put('/:id', usersController.updateUser);  
router.delete('/:id', usersController.deleteUser); 

module.exports = router;