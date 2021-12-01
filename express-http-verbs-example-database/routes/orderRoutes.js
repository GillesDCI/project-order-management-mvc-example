const express = require('express');

const controller = require('../controllers/orderController');

const router = express.Router();

router.get('/', controller.getOrders);
//using skip and limit to go through pages
router.get('/paging/:skip/:limit', controller.pagingOrders);
router.get('/paging', controller.pagingQueryParams);
//Get the order by userID
router.get('/byuser/:userid', controller.getOrdersByUserId);
//Create a new order 
router.post('/add', controller.addOrder);


module.exports = router;