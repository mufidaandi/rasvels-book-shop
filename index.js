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


app.use(express.static('public'));
app.use(bodyParser.json());

const router= require("./routes/route");
app.use('/',router);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});