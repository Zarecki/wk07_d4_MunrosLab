const PubSub = require ('../helpers/pub_sub.js');

const SelectView = function (element) {
  this.element = element;
}

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Munros:data-ready', (event) => {
    const allRegions = event.detail;
    this.createRegionsList(allRegions);
  });

  this.element.addEventListener('change', (evt) => {
    const selectedIndex = evt.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  });
};

SelectView.prototype.createRegionsList = function (allRegions) {
  const regionsList = document.createElement('select');
  regionsList.classList.add('regions');
  this.populateList(allRegions);
  return regionsList;
};


SelectView.prototype.populateList = function (regionsData) {
  regionsData.forEach((region, index) => {
    const option = document.createElement('option');
    option.textContent = region.name;
    option.value = index;
    this.element.appendChild(option);
  });
};

module.exports = SelectView;
