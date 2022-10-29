const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Picture = require('./models/Picture');Picture

const run = async () => {
  await mongoose.connect(config.mongo.db);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [admin, user1, user2] = await User.create({
    email: 'admin@gmail.com',
    password: 'admin',
    token: nanoid(),
    role: 'admin',
    displayName: 'Admin',
  }, {
    email: 'user@gmail.com',
    password: 'user',
    token: nanoid(),
    role: 'user',
    displayName: 'User',
  }, {
    email: 'test@gmail.com',
    password: 'test',
    token: nanoid(),
    role: 'user',
    displayName: 'Test',
  });


  await Picture.create({
    title: 'RTX 4090',
    image: 'fixtures/4090.jpg',
    isPublished: true,
    user: user1._id
  }, {
    title: 'RTX 3090',
    image: 'fixtures/3090.jpg',
    isPublished: true,
    user: user1._id
  }, {
    title: 'RTX 2070',
    image: 'fixtures/2070.jpg',
    isPublished: true,
    user: user2._id
  }, {
    title: 'GTX 1080',
    image: 'fixtures/1080.jpeg',
    isPublished: true,
    user: user2._id
  });

  await mongoose.connection.close();
};

run().catch(console.error);