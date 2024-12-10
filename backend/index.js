import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in .env file');
}

import { carCardCreateValidation, loginValidation, registerValidation } from './validations.js';
import handleValidationErrors from './utils/handleValidationErrors.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as ContentController from './controllers/ContentController.js';

mongoose
  .connect('mongodb://127.0.0.1:27017/fh5-htfc')
  .then(() => console.log('DB is OK'))
  .catch((err) => console.log('DB is not OK!', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Загрузить файл
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

// Создать карточку авто
app.post(
  '/car-cards',
  checkAuth,
  carCardCreateValidation,
  handleValidationErrors,
  ContentController.createCarCard,
);

// Получить все карточки авто
app.get('/car-cards', ContentController.getAllCarCards);

// Получить одну карточку авто
app.get('/car-cards/:id', ContentController.getOneCarCard);

// Обновить одну карточку авто
app.patch(
  '/car-cards/:id',
  checkAuth,
  carCardCreateValidation,
  handleValidationErrors,
  ContentController.updateOneCarCard,
);

// Удалить одну карточку авто
app.delete('/car-cards/:id', checkAuth, ContentController.removeOneCarCard);

app.listen(4444, (err) => {
  if (err) {
    return console.log('Server is not OK!', err);
  }

  console.log('Server is OK');
});
