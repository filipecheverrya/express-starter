const { MongoClient } = require('mongodb');
const url = require('url');

let mongoCache = null;

const connectDatabase = async (uri) => {
  if (mongoCache) {
    return mongoCache;
  }
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const dbName = url.parse(uri).pathname.substr(1);
  const db = client.db(dbName);
  mongoCache = db;
  return db;
}

exports.getCollection = async (name) => {
  const db = await connectDatabase(process.env.MONGODB_URI);
  return db.collection(name);
}
