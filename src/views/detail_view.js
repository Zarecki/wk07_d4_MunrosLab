const PubSub = require ('../helpers/pub_sub.js');

const DetailView = function (container) {
  this.container = container;
}

DetailView.prototype.bindEvents = function () {
  PubSub.subscribe('Munros:selected-region-detail', (evt) => {
    const region = evt.detail;
    this.render(region);
  });
};

DetailView.prototype.buildElement = function (type, text, cls) {
  let element = document.createElement(type);
  if (text != '') {element.textContent = text};
  if (cls) {element.classList = cls};
  return element;
}

DetailView.prototype.render = function (region) {
  const infoParagraph = document.querySelector('#info-container');
  const regionName = this.buildElement('h2', region.name);
  const munroList = document.createElement('ul');

  region.munros.forEach((munro) => {
    const listItem = this.buildElement('li', munro.name);
    const heightItem = this.buildElement('p', `height: ${munro.height}`);
    const meaningItem = this.buildElement('p', `meaning: ${munro.meaning}`);
    listItem.appendChild(heightItem);
    listItem.appendChild(meaningItem);
    munroList.appendChild(listItem);
  });

  this.container.innerHTML = "";

  infoParagraph.appendChild(regionName);
  infoParagraph.appendChild(munroList);

}


module.exports = DetailView;
