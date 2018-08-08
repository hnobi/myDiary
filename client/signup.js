/* eslint-disable */
// const apiUrl = 'https://your-diary.herokuapp.com/api/v1/';
const post = {
  fullname: 'practice',
  username: 'userpract',
  email: 'pract@yahoo.com',
  password: 'practice'
}

const signup = (post) => {
  // const fullname = document.getElementById('fullname').value,
  //   username = document.getElementById('username').value,
  //   email = document.getElementById('email').value,
  //   password = document.getElementById('password').value;

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');




  const options = {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    //   mode: 'cors',
    //   cache: 'default'
    // },
    headers: myHeaders,
    cache: 'default',
    body: JSON.stringify(post),
  };
  console.log('nddndndndndndndndnnndddndndddbdbd')
  var myRequest = new Request('http://your-diary.herokuapp.com/api/v1/auth/signup');

  return fetch(myRequest, options)
    .then((res) => { res.json(); })
    .then((data) => { console.log(data); })
    .catch((error) => { console.log(error); });
};

// document.getElementsByTagName(body).addEVentListener('load', function () { signup(post) })
function aaa() { signup(post) }