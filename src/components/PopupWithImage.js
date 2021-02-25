import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._fullImageUrl = this._popup.querySelector('.popup__image');
    this._fullImageDesc = this._popup.querySelector('.popup__image-title');
  }

  openPopup(name, link) {
    super.openPopup();
    this._fullImageUrl.src = link;
    this._fullImageUrl.alt = name
    this._fullImageDesc.textContent = name;
  }
}
