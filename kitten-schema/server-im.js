const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true,useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  console.log('Connected to MongoDB...');
});

// Create a Kitten schema
const kittySchema = new mongoose.Schema({
  name: String,
  age: Number,
  colour: String,
  breed: String
});

// Compile a schema into a model
const Kitten = mongoose.model('Kitten', kittySchema);

// Create a Kitten document using our new model
const kittyBrita = new Kitten({ 
  name: 'KittyBrita',
  age: 11,
  colour: `purple`,
  breed: `British Shorthair`
});

// Add a method to the schema
kittyBrita.save(function(error, kittyBrita){
  if (error) return console.error(error);
  kittyBrita.speak();
})

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
/* kittySchema.methods.speak = function () {
  let greeting;

  if (this.name) {
    greeting = `Meow name is ${this.name}, ${this.age} years old now, 
    lovely ${this.colour} color, and has beautiful ${this.breed}.`;
  } else {
    greeting = "I don't have a name.";
  }
  console.log(greeting);
}
*/
//const Kitten = mongoose.model('Kitten', kittySchema);


/* const newKitten = mongoose.model('Kitten', kittySchema);

const fluffy = new newKitten({name: 'Fluffy'}); */