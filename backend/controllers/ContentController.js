import CarCardModel from '../models/CarCard.js';

export const createCarCard = async (req, res) => {
  try {
    const doc = new CarCardModel({
      fullName: req.body.fullName,
      nickname: req.body.nickname,
      photo: req.body.photo,
      wikiLink: req.body.wikiLink,
      user: req.userId,
    });

    const carCard = await doc.save();

    res.json(carCard);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать карточку',
    });
  }
};

export const getAllCarCards = async (req, res) => {
  try {
    const carCards = await CarCardModel.find()
      .collation({ locale: 'en' })
      .sort({ fullName: 1 })
      .populate({ path: 'user', select: ['_id', 'fullName'] })
      .exec();

    res.json(carCards);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить карточки',
    });
  }
};

export const getOneCarCard = async (req, res) => {
  try {
    const carCardId = req.params.id;

    const carCard = await CarCardModel.findOne({ _id: carCardId })
      .populate({ path: 'user', select: ['_id', 'fullName'] })
      .exec();

    if (!carCard) {
      return res.status(404).json({
        message: 'Карточка не найдена',
      });
    }

    res.json(carCard);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить карточку',
    });
  }
};

export const updateOneCarCard = async (req, res) => {
  try {
    const carCardId = req.params.id;

    await CarCardModel.updateOne(
      {
        _id: carCardId,
      },
      {
        fullName: req.body.fullName,
        nickname: req.body.nickname,
        photo: req.body.photo,
        wikiLink: req.body.wikiLink,
        user: req.userId,
      },
    );

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить карточку',
    });
  }
};

export const removeOneCarCard = async (req, res) => {
  try {
    const carCardId = req.params.id;
    await CarCardModel.findOneAndDelete({ _id: carCardId });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить карточку',
    });
  }
};
