const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required'
  },
  plot: {
    type: String,
    required: true
  },
  genres: {
    type: Array,
    require: true
  }
});

movieSchema.index({ "$**" : 'text' });
module.exports = mongoose.model('Movie', movieSchema);