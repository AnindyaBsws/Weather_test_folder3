import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
// import sensorRoutes from './routes/sensorRoutes.js';
import User from './models/User.js';
import ExpressError from './utils/ExpressError.js';

import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import LocalStrategy from 'passport-local';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// // Middleware
app.use(cors());
app.use(express.json());

// DB + Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  crypto: {
      secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600
});

store.on('error', async err => {
  console.log('ERROR in MONGO SESSION STORE', err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
  }
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/sensors', sensorRoutes);

// app.all('*', (req, res, next) => {
//   next(new ExpressError(404, 'Page Not Found!'));
// });
