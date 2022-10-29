const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');
const auth = require("../middleware/auth");
const Picture = require("../models/Picture");
const User = require("../models/User");

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
  const query = {};
  query.isPublished = {$eq: true};

  try {
    const token = req.get('Authorization');
    const user = await User.findOne({token});

    if (user && user.role === 'admin') {
      delete query.isPublished;
    }

    const pictures = await Picture
      .find(query)
      .populate('user', 'displayName');

    res.send(pictures);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/users/:id', async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({message: 'ID not valid'});
  }

  try {
    const pictures = await Picture
      .find({user: id})
      .populate('user', 'displayName');

    res.send(pictures);
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

    if (!pictureData.title || !pictureData.image || !pictureData.user) {
      return res.status(400).send({message: 'Fill in all the fields!'});
    }

    const picture = new Picture(pictureData);
    await picture.save();

    res.send(picture);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({message: 'ID not valid'});
  }

  try {
    const picture = await Picture.findOne({_id: id});

    if (!picture) {
      return  res.status(404).send({message: 'Picture not found!'});
    }

    if (req.user._id.equals(picture.user) || req.user.role === 'admin') {
      await Picture.deleteOne({_id: id});

      return res.send({message: 'Picture deleted!'});
    }

    res.status(403).send({message: 'You have no rights!'});
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;