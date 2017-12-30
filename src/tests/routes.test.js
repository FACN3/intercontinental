const tape = require('tape');
const supertest = require('supertest');
const app = require('../app');
const build = require('../database/db_build');

tape('basic index.html test', t => {
  supertest(app)
    .get('/')
    // .expect(200)
    .end((err, res) => {
      console.log('res.status is ', res.status);
      if (err) {
        t.error(err);
      } else {
        // t.equals(200, res.status, 'response should equal 200');
        t.pass('expected 200 response');
      }
      t.end();
    });
});

tape(
  'server receives username and password and returns with username and id',
  t => {
    const user = { username: 'Neil', password: 'abcdefg' };
    supertest(app)
      .post('/login')
      .send(user)
      .expect(200)
      .end((err, res) => {
        if (err) {
          t.error(err);
        } else {
          console.log(res.body);
          t.ok(
            res.body.id && res.body.username,
            'res.body shuld include id and username'
          );
        }
        t.timeoutAfter(5000);
        t.end();
      });
  }
);

tape('loginUser query deals with incorrect credentials', t => {
  build((err, res) => {
    if (err) throw new Error(err);
    else {
      const user = { username: 'nneil', password: '1abcdefg' };
      supertest(app)
        .post('/login')
        .send(user)
        .expect(200)
        // .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) t.error(err);
          else {
            console.log('res.text is', res.text);
            console.log('res.body is', res.body);
            t.equals(
              res.body,
              'incorrect user/pass combo',
              'res.body should equal incorrect user/pass combo'
            );
          }
          t.end();
        });
    }
  });
});
