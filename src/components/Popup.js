export default class Popup {
  constructor(popupSelector) {
    this._popup = document.getElementById(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    // this._handleOverlayClickClose = this._handleOverlayClickClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _handleOverlayClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {this.closePopup()});
    this._popup.addEventListener('click', (evt) => this._handleOverlayClickClose(evt));
  }
}
