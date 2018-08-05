
function Signup(event) {
  const fullname = document.getElementById('fnamne').value;
  const username = document.getElementById('unamne').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const url = 'https://your-diary.herokuapp.com';


  fetch(`${url}/api/v1/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullname, username, email, password
    })
  }).then(response => response.json())
    .then((data) => {

      console.log(data);
    }).catch(err => err.message);
}

document.getElementById('signup').addEventListener('submit', Signup);

function get() {
  fetch('https://your-diary.herokuapp.com', { mode: 'no-cors' }).then((response) => {
    response.json().then((data) => {
      console.log(data);
    })
  });
}





// fetch(url, {
//   method: 'POST',
//   headers: {
//     'auth': '1234'
//   },
//   body: JSON.stringify({
//     name: 'dean',
//     login: 'dean',
//   })
// })
//   .then(function (data) {
//     console.log('Request success: ', data);
//   })
//   .catch(function (error) {
//     console.log('Request failure: ', error);
