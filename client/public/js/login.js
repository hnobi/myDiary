const login = (e) => {
  e.preventDefault();
  document.getElementById('loading').style.display = 'block';
  document.getElementById('after-click').style.display = 'none';

  const post = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)

  };
  console.log('working');
  fetch('https://your-diary.herokuapp.com/api/v1/auth/signin', option)
    .then(res => res.json())
    .then((data) => {
      document.getElementById('loading').style.display = 'none';
      if (data.status === 'Success') {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('name', (data.data.username));
        window.localStorage.setItem('image', (data.data.image));
        window.location.replace('./add-entry.html');

      } else {
        invalidUser();
      }
    })
    .catch((error) => {
      return error;
    });
};
const invalidUser = () => {
  document.getElementById('after-click').style.display = 'block';
  document.getElementById('username').style.color = '';
};
document.getElementById('signin').addEventListener('submit', login, false);
