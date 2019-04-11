const Munros = require('./models/munros.js');
const SelectView = require('./views/select_view.js');
const DetailView = require('./views/detail_view.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');


  const selectElement = document.querySelector('#select-container');
  const regionDropdown = new SelectView(selectElement);
  regionDropdown.bindEvents();

  const infoDiv = document.querySelector('#info-container');
  const regionInfoDisplay = new DetailView(infoDiv);
  regionInfoDisplay.bindEvents();

  const munros = new Munros();
  munros.bindEvents();
});
