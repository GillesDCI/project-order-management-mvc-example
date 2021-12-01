const express = require('express');

const controller = require('../controllers/teaController');

const router = express.Router();

//in-memory database with Teas 
// const teas = [ 
//     { id:'1', name:'Green Tea' }, 
//     { id:'2', name:'White Tea' },   //--> These ones we don't need here anymore. 
//     { id:'3', name:'Oolong Tea' }];

//READ OPERATION
//using GET (get list of teas)
router.get('/', controller.getTeas);

//READ OPERATION
//using a GET request with a id parameter 
router.get('/:id', controller.getTeaById);

//READ OPERATION
//using a GET request with a name parameter
router.get('/byname/:name', controller.getTeaByName)

//READ OPERATION
//using a GET request with a id parameter 
router.get('/byname/multiple/:name', controller.getMultipleTeasByName)

//CREATE
//POST request to create a new tea.
router.post('/add', controller.addTea)
//UPDATE OPERATION
//PATCH request to update the name of the tea. 
router.patch('/update/:id', controller.updateTeaById);

//UPDATE OPERATION
//PATCH request to update the name of the tea. 
router.patch('/update/description/:name', controller.updateDescriptionByName);
//DELETE OPERATION  
//DELETE request 
router.delete('/delete/:id', controller.deleteById);

//DELETE OPERATION  
//DELETE request 
router.delete('/delete/category/:category', controller.deleteByCategory);

module.exports = router;