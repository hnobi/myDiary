const addEntry = (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if (token == null) {
    window.location.href = 'signin.html';
  } else {
    const post = {
      title: document.getElementById('title').value,
      date: document.getElementById('date').value,
      entry: document.getElementById('entry').value

    };
    fetch('https://your-diary.herokuapp.com/api/v1/entries',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(post)
      }).then((res) => {
        res.json();
      }).then((data) => {
        console.log('adding');
        console.log(data);
      })
      .catch((err) => { console.log(err); });
  }
};
document.getElementById('add-entry').addEventListener('submit', addEntry, false);
