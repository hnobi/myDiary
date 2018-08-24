function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('image');
  localStorage.removeItem('strignifiedData');
  localStorage.removeItem('entryId');
  window.location.href = '/login.html';
}

document.getElementById('logout').addEventListener('click', logOut, false);

