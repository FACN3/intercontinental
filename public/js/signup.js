function fetchGET(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // console.log(xhr.responseText);
      callback(null, JSON.parse(xhr.responseText));
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      callback(xhr.status);
      console.log(xhr.readyState, xhr.status);
    } else {
      console.log(xhr.readyState, xhr.status);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

function fetchPOST(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    console.log(xhr.readyState);
    if (xhr.readyState == 4 && xhr.status !== 200) {
      console.log('xhr.status!=200');
      callback(xhr.responseText);
    } else if (xhr.readyState == 4 && xhr.status === 200) {
      console.log('responseText is ', xhr.responseText);
      callback(null, xhr.responseText);
    }
  };
  xhr.open('POST', url, false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
}

document.querySelector('.signIn').addEventListener('submit', function(e) {
  e.preventDefault();
  var data = {};
  var username = document.getElementById('usernameSignIn').value;
  var pass = document.getElementById('passwordSignIn').value;
  data.username = username;
  data.pass = pass;
  //
  // fetchPOST('/login', data, function(err, res) {
  //   console.log('data is ', data);
  //   if (err) {
  //     console.log('in error');
  //     console.log(err);
  //   } else {
  //     /*else if (res === 'Username does not exist' || res === 'Wrong Password') {
  //     document.querySelector('#signInRules').textContent =
  //       'Invalid Username / Password';
  //   }*/
  //
  //     console.log('in res of callback of fetchpost login');
  //     console.log(res);
  //     // window.location.href = '/';
  //   }
  // });

  fetch('/login', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data)
    // console.log('hello');
  })
    .then(function(res) {
      // console.log(res);
      return res.json();
    })
    .then(function(data) {
      document.querySelector('#signInRules').textContent = '';
      console.log(data);
      if (data == 'login successful') {
        window.location.href = '/auth/continents';
      } else if (data == 'incorrect user/pass combo') {
        document.querySelector('#signInRules').textContent =
          'incorrect username/password';
      }
    })
    .catch(function(res) {
      return console.log('catch');
    });
});

document.querySelector('.signUp').addEventListener('submit', function(e) {
  e.preventDefault();
  if (
    document.querySelector('#passwordSignUp').value !==
    document.querySelector('#confirm').value
  ) {
    document.querySelector('#rules').textContent = 'passwords do not match';
  } else {
    document.querySelector('#rules').textContent = '';
    var user = document.querySelector('#usernameSignUp').value;
    var pass = document.querySelector('#passwordSignUp').value;

    //Return a message to the user if password is too short.
    if (pass.length < 8) {
      document.querySelector('#rules').textContent =
        'Password should be at least 8 characters.';
    } else if (user.length < 6) {
      document.querySelector('#rules').textContent =
        'Username should be at least 6 characters.';
    } else {
      var data = {};
      data.username = user;
      data.pass = pass;

      fetchPOST('/signup', data, function(err, res) {
        console.log('query is', data);
        if (err) {
          console.log('error with', err);
        } else if (res === JSON.stringify('username already exists')) {
          document.querySelector('#rules').textContent =
            'username already exists';
        } else if (res === JSON.stringify('login successful')) {
          window.location.href = '/auth/continents';
        } else {
          console.log('no other else if statments match');
        }
      });
    }
  }
});

//Create a regex check function
