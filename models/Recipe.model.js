const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    unique: true,
    required: [true, 'Title is mandatory']
  },
  level: {
    type: String,
    enum: {
      values: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
      message: 'That is not an accepted value. Please try again.'
    }
  },
  ingredients: {
    type: [String]
  },
  cuisine: {
    type: String,
    required: [true, 'Cuisine is mandatory']
  },
  dishType: {
    type: String,
    enum: {
      values: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other'],
      message: 'That is not an accepted value. Please try again'
    }
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
