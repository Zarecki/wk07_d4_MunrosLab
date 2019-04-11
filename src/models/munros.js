const Request = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Munros = function () {
  this.data = null;
};

Munros.prototype.bindEvents = function () {
  this.getData();
  PubSub.subscribe('SelectView:change', (evt) => {
    const selectedIndex = evt.detail;
    this.publishMunroDetail(selectedIndex);
  });
};

Munros.prototype.getData = function () {
  const url = 'https://munroapi.herokuapp.com/munros';
  const request = new Request(url);
  request.get().then((munros) => {this.handleDataReady(munros);
  PubSub.publish('Munros:data-ready', this.data);
  })
  .catch((err) => {
    PubSub.publish('Munros:error', err);
  });
};

Munros.prototype.handleDataReady = function (munros) {
  const regionNames = this.getRegionNames(munros);
  this.modelRegions(munros, regionNames);
};

Munros.prototype.getRegionNames = function (munros) {
  return munros
  .map(munro => munro.region)
  .filter((region, index, regions) => regions.indexOf(region) === index);
};

Munros.prototype.modelRegions = function (munros, regionNames) {
  this.data = regionNames.map((regionName) => {
    return {
      name: regionName,
      munros: this.munrosByRegion(munros, regionName)
    };
  });
};


Munros.prototype.munrosByRegion = function (munros, region) {
  return munros.filter(munro => munro.region === region);
};

Munros.prototype.publishMunroDetail = function (selectedIndex) {
  const selectedRegion = this.data[selectedIndex];
  PubSub.publish('Munros:selected-region-detail', selectedRegion);
};

module.exports = Munros;
