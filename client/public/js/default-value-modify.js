const data = localStorage.getItem('strignifiedData');
const datas = JSON.parse(data);
const modifyValue = () => {
  console.log(datas)
  document.getElementById('title').value = `${datas.title}`;
  document.getElementById('date').value = `${datas.date}`;
  document.getElementById('entry').value = `${datas.entry}`;
};
