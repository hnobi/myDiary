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

// document.getElementById('modify-entry').addEventListener('submit', modifyEntry, false);
