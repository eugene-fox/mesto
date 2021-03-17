export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem(item) {
    this._containerSelector.prepend(item);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
