const express = require('express');

const controller = require('../controllers/userController');

const router = express.Router();

//List of all the users 
router.get('/', controller.getUsers);

//creating a new user 
router.post('/add', controller.addUser);

//updating the document partly (adding one favorite at a time)
// URL: http://localhost:4000/api/users/favorites/add/one/USERID:Mongoose.Schema.ObjectId
// HTTP BODY : {"favorite":"GARDEN"}
router.patch('/favorites/add/one/:id', controller.addOneFavoriteById);

//updating the document partly (adding one favorite at a time)
// URL: http://localhost:4000/api/users/favorites/add/multiple/USERID:Mongoose.Schema.ObjectId
// HTTP BODY : {"favorites":"GARDEN,ELECTRONICS,KITCHEN,CLOTHING"}
//
router.patch('/favorites/add/multiple/:id', controller.addMultipleFavoritesById);

//updating the document partly (adding one favorite at a time and unique element)
// URL: http://localhost:4000/api/users/favorites/add/one/USERID:Mongoose.Schema.ObjectId
// HTTP BODY : {"favorite":"GARDEN"}
//
router.patch('/favorites/add/one/unique/:id', controller.addOneUniqueFavoriteById);

// updating the document partly (removing one favorite at a time)
// URL: http://localhost:4000/api/users/favorites/remove/one/USERID:Mongoose.Schema.ObjectId
// HTTP BODY : EMPTY
//
router.patch('/favorites/remove/one/:id', controller.removeOneFavoriteById);

// updating the document partly (setting a field)
// URL: http://localhost:4000/api/users/update/USERID:Mongoose.Schema.ObjectId
// HTTP BODY : {"username":"test"}
//
router.patch('/update/:id', controller.updateById);

// remove the field of the document (remove a field)
// URL: http://localhost:4000/api/users/update/removefield/USERID:Mongoose.Schema.ObjectId
// HTTP BODY : EMPTY
router.patch('/update/removefield/:id', controller.removeFieldById);


module.exports = router;