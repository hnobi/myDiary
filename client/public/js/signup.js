/* eslintignore */
const signup = (e) => {

  document.getElementById('signup').style.display = 'none';
  document.getElementById('loading').style.display = 'block';

  e.preventDefault();
  const post = {
    fullname: document.getElementById('fullname').value,
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)

  };
  fetch('https://your-diary.herokuapp.com/api/v1/auth/signup', option)
    .then(res => res.json())
    .then((data) => {
      if (data.status === 'Success') {
        window.localStorage.setItem('token', data.token);
        window.location.replace('./add-entry.html');
      } else {
        ExistedUser();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
const ExistedUser = () => {
  document.getElementById('after-click').style.display = 'block';
  document.getElementById('email').value = '';
  document.getElementById('username').value = '';
  document.getElementById('loading').style.display = 'none';
  document.getElementById('signup').style.display = 'block';

};
document.getElementById('signup').addEventListener('submit', signup, false);
