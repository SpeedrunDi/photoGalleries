const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const idValidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: String
});

PictureSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
PictureSchema.plugin(uniqueValidator, {message: 'Error, such username already exists'});
const Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;
