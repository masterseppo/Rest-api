require('../models/db');
const Movie = require('../models/movie');


/**
* /api/movies/ 
* GET All Movies
*/
exports.listMovies = async(req, res) => {
    let { limit = 20, page = 1, category, q } = req.query;
  
    const limitRecords = parseInt(limit);
    const skip = (page -1) * limit;
  
    let query = {};
    if(q) {
      query = {$text: {$search: q}};
    }
    if(category) query.category = category;
   
  
    try {
      const movies = await Movie.find(query).limit(limitRecords).skip(skip);

      res.json({ page: page, limit:limitRecords, movies});
    } catch (err) {
      res.status(400).json( {message: err })
    } 
  }

  /**
* /api/movies/:id
* GET Single Movie
*/

  exports.getSingleMovie = async(req, res) => {
    let paramID = req.params.id;
  
    try {
      const data = await Movie.findById({ _id:paramID });
      res.json(data);
    } catch (error) {
      res.status(400).json( { message: err })
    }
  }


/**
* /api/movies/ 
* POST Single Movie
*/
exports.insertSingleMovie = async(req, res) => {

  const newMovie = new Movie({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    thumbnail: req.body.thumbnail 
  });

  try {
    await newMovie.save();
    res.json(newMovie);
  } catch (err) {
    res.status(400).json( { message: err })
  }
}


/**
* /api/movies/:id
* PATCH Single Movie
*/
exports.updateSingleMovie = async(req, res) => {
  let paramID = req.params.id;
  let name = req.body.name;

  try {
    const updateMovie = await Movie.updateOne({ _id:paramID }, { name:name });
    res.json(updateMovie);
  } catch (error) {
    res.status(400).json( { message: err })
  }
}


/**
* /api/movies/:id
* DELETE Single Movie
*/
exports.deleteSingleMovie = async(req, res) => {
  let paramID = req.params.id;

  try {
    const data = await Movie.deleteOne({ _id:paramID });
    res.json(data);
  } catch (error) {
    res.status(400).json( { message: err })
  }
}