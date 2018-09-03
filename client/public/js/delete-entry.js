const deleteEntry = () => {
  const confirmDelete = confirm("Delete this entry?");
  if (confirmDelete) {
    const message = document.getElementById('success-message');
    message.style.display = 'block';
    const close = document.getElementById('close');

    // document.getElementById('loading').style.display = 'block';

    const option = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    };
    fetch(`https://your-diary.herokuapp.com/api/v1/entries/${entryId}`, option)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => { console.log(err); });
    close.onclick = function () {
      window.location.replace('./entries.html');
      message.style.display = 'none';
    };
  }
};

document.getElementById('delete').addEventListener('click', deleteEntry, false);
