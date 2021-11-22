const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const cors = require('cors');
const env = require('dotenv').config();
console.log(process.env.SECRET);

const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

const passport = require('passport');

// import authMiddleware
//const { requireAuth, checkUser } = require('./middleware/authMiddleware');
//const passport = require('./config/passport');

const app = express();

// middleware
app.use(express.static('public'));
app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(passport.initialize());

// console.log(process.env.DATABASE_URL);

// Bring in the Strategy
require('./config/passport')(passport);

app.set('email_templates', path.join(__dirname, '/emailTemplates'));
app.use('/uploads/', express.static('uploads'));

const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// database connection
//const dbURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const dbURI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
// const dbURI = 'mongodb://localhost:27017/avds-nuxt-backend';
console.log(dbURI);

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    const PORT = process.env.NODE_DOCKER_PORT || 7777;
    app.listen(PORT);

    console.log(`Server is listening on localhost:${PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set('useFindAndModify', false);

app.get('/', (req, res) => {
  res.send('<h1>React Task Tracker | Backend </h1>');
});

// app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

app.use(notFound);
app.use(errorHandler);
