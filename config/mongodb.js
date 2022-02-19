const { MongoClient } = require('mongodb');

const uri = 'mongodb://user_admin:123123@127.0.0.1:27017?authSource=admin';
const dbName = 'eduwork-native';

const client = new MongoClient(uri);

(async () => {
  try {
    await client.connect();
    console.log('koneksi ke mongodb berasil');
  } catch (e) {
    console.log(e);
  }
})();

const db = client.db(dbName);

module.exports = db;
