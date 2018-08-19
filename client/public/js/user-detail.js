const token = localStorage.getItem('token');
if (token === null) {
  window.location.href = './signin.html';
}
const getUserDetails = () => {
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },

  };
  fetch('https://your-diary.herokuapp.com/api/v1/user/details', option)
    .then(res => res.json()).then((data) => {
      console.log(data);
      if (data.status === 'Success') {
        const user = data.data;
        document.getElementById('fullname').value = user.fullname;
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;
        // document.getElementById('password').value = user.password;
        document.getElementById('remainder').value = user.remainder;
        document.getElementById('image').value = user.image;
      }
    });
};
//
// const updateUserDetails = () => {
//   const post = {
//     fullname: document.getElementById('fullname').value,
//     username: document.getElementById('username').value,
//     email: document.getElementById('email').value,
//     password: document.getElementById('password').value,
//     remainder: document.getElementById('remainder').value,
//     image: document.getElementById('image').value,
//   };
//   const option = {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': token,
//     },
//     body: JSON.stringify(post)
//   };
//   fetch('https://your-diary.herokuapp.com/api/v1/user/details', option)
//     .then(res => res.json()).then((data) => {
//       console.log('inside');

//       console.log(data);

//     });
// };