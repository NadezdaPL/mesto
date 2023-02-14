export class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  addItem(element) {
    this._container.append(element)
  }

  renderCards(cards) {
    cards.forEach(this._renderer)
  }
}