const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

/*
* APP Routes
*/
router.get('/api/getall/', movieController.listMovies);
router.get('/api/getone/:id', movieController.getSingleMovie);
router.post('/api/add/', movieController.insertSingleMovie); 
router.patch('/api/update/:id', movieController.updateSingleMovie); 
router.delete('/api/delete/:id', movieController.deleteSingleMovie); 

module.exports = router;