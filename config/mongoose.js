const mongoose = require('mongoose');
const database =
  process.env.MONGO ||
  'mongodb+srv://eduwork:eduwork123@mern-eduwork.j039a.mongodb.net/mern-project?retryWrites=true&w=majority';

// mongoose.connect(
//   'mongodb://user_admin:123123@127.0.0.1:27017?authSource=admin'
// );
mongoose.connect(database);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Server database terhubung'));
