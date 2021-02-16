export default class Section {
  constructor({
    items,
    renderer
  }, containerSelector) {
    this._initialItems = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem(item) {
    this._containerSelector.append(item);
  }

  renderItems() {
    this._initialItems.forEach(item => {
      this._renderer(item);
    });
  }
}
