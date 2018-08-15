const token = localStorage.getItem('token');
if (token === null) {
  window.location.href = './signin.html';
}
const getAllEntry = () => {
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },

  };
  fetch('https://your-diary.herokuapp.com/api/v1/entries', option)
    .then(res => res.json()).then((data) => {
      let userEntry = '';
      const datas = data.entries;
      datas.map((entry) => {
        userEntry += `<tr>
        <td>${entry.id}</td>
        <td>${entry.date}</td>
        <td>${entry.title}</td>
        <td>${entry.entry.split(' ')[0]} ${entry.entry.split(' ')[1]} ...</td>
        <td>
          <a>
        <button class="view-button" data-entryid=${entry.id} >View Entry</button>
          </a >
        </td >
      </tr > `;
      });
      document.getElementById('tbody').innerHTML = userEntry;
    });
};
const singleEntry = (e) => {

  if (e.target.classList.contains('view-button')) {
    const entryId = e.target.getAttribute('data-entryid');
    window.localStorage.setItem('entryId', entryId);
    window.location.href = './view-entry.html';
  }
}
document.getElementById('tbody').addEventListener('click', singleEntry);

