export class Section {
  constructor({renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element) {
    this._container.append(element)
  }

  renderCards(cards) {
    cards.forEach(this._renderer)
  }
}