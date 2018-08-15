const token = localStorage.getItem('token');
if (token === null) {
  window.location.href = './signin.html';
}
const addEntry = (e) => {
  e.preventDefault();
  const message = document.getElementById('success-message');
  const close = document.getElementById('close');
  document.getElementById('loading').style.display = 'block';
  const post = {
    title: document.getElementById('title').value,
    date: document.getElementById('date').value,
    entry: document.getElementById('entry').value
  };
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(post)
  };
  fetch('https://your-diary.herokuapp.com/api/v1/entries', option)
    .then(res => res.json())
    .then((data) => {
      document.getElementById('loading').style.display = 'none';
      if (data.status === 'Success') {
        message.style.display = 'block';
        document.getElementById('existed-title').style.display = '';
      } else {
        document.getElementById('existed-title').style.display = 'block';
      }
    })
    .catch((err) => { console.log(err); });

  close.onclick = function () {
    message.style.display = 'none';
  };
};
document.getElementById('add-entry').addEventListener('submit', addEntry, false);
