const connect = require('../database/db_connection');

const addUser = (username, password) => {
  connect
    .query(
      `INSERT INTO users IF NOT EXISTS (username, password) VALUES ($1,$2) RETURNING id, username`,
      [username, password]
    )
    .then(idArray => {
      console.log('idArray.rows is ,'idArray.rows);
      console.log('idArray is ,'idArray);
      return idArray[0]
    })
    .catch(err => console.log('error in addUser ', err));
};

const loginUser = (username, password) => {
  connect
    .query(
      `SELECT username,password FROM users WHERE username=$1 AND password=$2`,
      [username, password]
    )
    .then(idArray => {
      if (idArray[0]) {
        return idArray[0];
      } else {
        return 'user not found';
      }
    });
};

//todo add comment query, get comment query
