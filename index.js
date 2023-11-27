const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;

mongoose.connect('mongodb://127.0.0.1:27017/Book', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

const bookRouter= require("./routes/book");
app.use('/',bookRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});