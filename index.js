const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({title: 'Pizza', level: 'Easy Peasy', ingredients: ['mozzarella', 'tomato', 'mushrooms'], cuisine: 'Italian', dishType: 'main_course', duration: 30, creator: 'Marc'})
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(data => console.log(data[0].title, data[1].title, data[2].title, data[3].title, data[4].title))
  //createdRecipe => console.log(createdRecipe.title)
  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
  })
  .then(recipeUpdated => console.log(`${recipeUpdated} Updated successfully!`))
  .then(() => {
    return Recipe.deleteOne({title: 'Chocolate Chip Cookies'})
  })
  .then(deletedRecipe => console.log(`${deletedRecipe} deleted`))
  .then(() => mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
