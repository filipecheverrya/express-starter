const { getCollection } = require("../database/connect")

exports.createPost = async (req, res, next) => {
  const collection = await getCollection('users');
  const searchQuery = { email: req.body.email };
  const user = await collection.findOne(searchQuery);
  
  await collection.updateOne(
    searchQuery,
    {
      $set: { posts: user.posts.concat(req.body.text) },
      $currentDate: { lastModified: true },
    }
  );

  return res.status(200).send({ message: 'post created succesfully!' });
}