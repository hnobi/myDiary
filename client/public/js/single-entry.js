const entryId = localStorage.getItem('entryId');
const token = localStorage.getItem('token');
if (token === null) {
  window.location.href = './signin.html';
}
const getEntry = () => {
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    }
  };
  fetch(`https://your-diary.herokuapp.com/api/v1/entries/${entryId}`, option)
    .then(res => res.json()).then((data) => {
      let entry = data.data;
      console.log(entry)
      document.getElementById('title').innerHTML = `${entry.title}`;
      document.getElementById('content').innerHTML = `${entry.entry}`;
      document.getElementById('date').innerHTML = `${entry.date}`;
    });
};
//  document.getElementById('body').addEventListener("load", getEntry);
const modifyEntry = (e) => {
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
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(post)

  };
  fetch(`https://your-diary.herokuapp.com/api/v1/entries/${entryId}`, option)
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
// document.getElementById('modify-entry').addEventListener('submit', modifyEntry, false);
