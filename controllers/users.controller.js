const bcrypt = require('bcrypt');
const { v4: uuidV4 } = require('uuid');

const { getCollection } = require('../database/connect');
const { createToken } = require('./auth.controller');

const collectionName = 'users';

exports.createUser = async (data) => {
  const collection = await getCollection(collectionName);
  const _id = uuidV4();
  
  data.password = await bcrypt.hashSync(
    data.password,
    bcrypt.genSaltSync(10),
    null,
  );

  const user = await collection.insertOne({
    ...data,
    _id,
    posts: [],
  });

  return user;
}

exports.findByEmail = async (email) => {
  const collection = await getCollection(collectionName);
  const user = collection.findOne({ email });
  
  return user;
}

exports.signIn = async (user) => {
  const { password, email } = user;
  const collection = await getCollection(collectionName);
  const userDb = await collection.findOne({ email });
  
  const compare = bcrypt.compareSync(
    password,
    userDb.password,
  );

  if (!compare) {
    return { authorized: compare };
  }

  return {
    authorized: compare,
    user: {
      ...userDb,
      token: createToken({ id: userDb.id })
    }
  };
}
