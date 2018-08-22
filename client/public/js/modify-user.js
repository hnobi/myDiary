
const updateUserDetails = () => {
  const post = {
    fullname: document.getElementById('fullname').value,
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    remainder: document.getElementById('remainder').value,
    // image: document.getElementById('image').value,
  };
  const option = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // 'x-access-token': token,
    },
    body: JSON.stringify(post)
  };
  fetch('https://your-diary.herokuapp.com/api/v1/user/details', option)
    .then(res => res.json()).then((data) => {
      console.log('inside');
      console.log(data);
    });
};
