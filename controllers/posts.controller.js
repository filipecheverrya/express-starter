const { getCollection } = require("../database/connect")

exports.createPost = async (req, res, next) => {
  const { id } = req.body;
  const collection = await getCollection('users');
  
  const idQuery = { _id: id };
  const user = await collection.findOne(idQuery);

  const newPosts = [
    ...user.posts,
    { text: req.body.text, createdAt: new Date() }
  ];
  
  await collection.updateOne(
    idQuery,
    {
      $set: { posts: newPosts },
      $currentDate: { lastModified: true },
    }
  );

  return res.status(200).send({ message: 'post created succesfully!' });
}