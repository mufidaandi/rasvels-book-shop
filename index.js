const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes
const userRoutes = require('./routes/userRoutes'); // Import admin routes
const authRoutes = require('./routes/authRoutes'); // Import auth routes


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

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const router= require("./routes/route");
app.use('/',router);


// -----------------------------------------admin things-----------------------------------------
// Set the views directory to where your HTML files are located
// Serve static files from the "public" directory 
app.use('/auth', express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'public')));
app.use('/admin/books/add', express.static(path.join(__dirname, 'public')));
app.use('/admin/books/edit', express.static(path.join(__dirname, 'public')));
app.use('/admin/inventory/add', express.static(path.join(__dirname, 'public')));
app.use('/admin/inventory/edit', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({ secret: 'e02de513d8422b0cf15146daf89cbb0fbc8358fa0e62c08256e53400848470c3', resave: false, saveUninitialized: false }));
// Passport middleware setup
app.use(passport.initialize());
app.use(passport.session());

// Use the admin routes
app.use('/admin', adminRoutes);
app.use('/', userRoutes);
app.use('/auth', authRoutes);
// -----------------------------------------end admin things-----------------------------------------

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});