const connect = require('../database/db_connection');
const bcrypt = require('bcryptjs');
require('env2')('config.env');

// const addUser = async (username, password, callback) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     console.log('hash in promise is ', hash);
//     const { rows } = await connect.query(
//       `INSERT INTO users  (username, password) VALUES ($1,$2) ON CONFLICT (username) DO NOTHING RETURNING id, username
// `,
//       [username, hash]
//     );
//   } catch (err) {
//     callback('error');
//   }
//   console.log('rows are', rows);
//   if (!rows) callback('error');
//   else callback(null, rows);
// };

const addUser = (username, password, callback) => {
  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => {
      console.log('hash in promise is ', hash);
      return connect.query(
        `INSERT INTO users  (username, password) VALUES ($1,$2) ON CONFLICT (username) DO NOTHING RETURNING id, username
`,
        [username, hash]
      );
    })
    .then(idArray => {
      console.log('idArray.rows is', idArray.rows);
      console.log('idArray is', idArray);
      return callback(null, idArray.rows[0]);
    })
    .catch(err => callback(err));
};

const loginUser = async (username, password, callback) => {
  try {
    const { rows } = await connect.query(
      `SELECT id,username,password FROM users WHERE username=$1`,
      [username]
    );
    console.log('rows is', rows);
    let compare = await bcrypt.compare(password, rows[0].password);
    console.log('compare is', compare);
    if (compare === true) return callback(null, rows[0]);
    else return callback(false);
  } catch (err) {
    return callback(err);
  }
  // res.redirect(200, '/auth/continents');
};

//todo add comment query, get comment query
module.exports = { addUser, loginUser };
