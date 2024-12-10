import mongoose from 'mongoose';

const CarCardSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    nickname: {
      type: String,
      trim: true,
      required: true,
    },
    photo: {
      type: String,
      trim: true,
      required: true,
    },
    wikiLink: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('CarCard', CarCardSchema);
