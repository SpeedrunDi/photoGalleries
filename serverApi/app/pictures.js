const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');
const auth = require("../middleware/auth");
const Picture = require("../models/Picture");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

router.get('/', async (req, res) => {
  try {
    const pictures = await Picture
      .find()
      .populate('user');

    res.send(pictures);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const picture = await Picture.findById(req.params.id);

    if (!picture) {
      res.status(404).send({message: 'Picture not found!'});
    }

    res.send(picture);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const {title} = req.body;

    const pictureData = {
      title,
      user: req.user._id
    };

    if (req.file) {
      pictureData.image = 'uploads/' + req.file.filename;
    }

    const picture = new Picture(pictureData);
    await picture.save();

    res.send(picture);
  } catch (e) {
    res.status(400).send(e);
  }
});



module.exports = router;