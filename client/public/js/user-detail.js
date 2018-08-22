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
        document.getElementById('password').value = user.password;
        document.getElementById('remainder').value = user.remainder;
        document.getElementById('user-image').src = user.image;
      }
    });
};
//
const updateUserDetails = (e) => {
  e.preventDefault();
  document.getElementById('loading').style.display = 'block';
  const post = {
    fullname: document.getElementById('fullname').value,
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    remainder: document.getElementById('remainder').value,
  };
  const option = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(post)
  };
  fetch('https://your-diary.herokuapp.com/api/v1/user/details', option)
    .then(res => res.json()).then(() => {
      console.log('successfully fetch data');
      document.getElementById('loading').style.display = 'none';
    }).catch((err) => {
      console.log(err);
    });
};


document.getElementById('update-user').addEventListener('submit', updateUserDetails, false);

const updateImage = (e) => {
  e.preventDefault();
  // The following line of code fetches the first file in the node's file list as a File object:
  const imageInput = document.getElementById('image');
  const formData = new FormData();
  formData.append('image', imageInput.files[0]);

  const option = {
    method: 'PUT',
    headers: {
      'x-access-token': token,
    },
    body: formData
  };
  fetch('https://your-diary.herokuapp.com/api/v1/user/upload', option)
    .then(res => res.json())
    .then((data) => {
      document.getElementById('user-image').src = data.imageUrl;
    }).catch(err => console.log(err));
};
document.getElementById('update-image').addEventListener('change', updateImage, false);

