import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Длина пароля должна составлять от 8 до 32 символов').isLength({
    min: 8,
    max: 32,
  }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Длина пароля должна составлять от 8 до 32 символов').isLength({
    min: 8,
    max: 32,
  }),
  body('fullName', 'Длина имени должна составлять от 1 до 128 символов').isLength({
    min: 1,
    max: 128,
  }),
  body('avatarUrl', 'Некорректная ссылка').optional().isURL(),
];

export const carCardCreateValidation = [
  body('fullName', 'Введите название авто (из каталога), не более 256 символов')
    .isLength({ min: 1, max: 256 })
    .isString(),
  body('nickname', 'Введите название авто (из поиска на Аукционе), не более 256 символов')
    .isLength({ min: 1, max: 256 })
    .isString(),
  body('photo', 'Некорректная ссылка на изображение').isString(),
  body('wikiLink', 'Некорректная ссылка на Вики').isURL(),
];
