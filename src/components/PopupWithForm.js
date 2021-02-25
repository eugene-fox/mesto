import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._popup.querySelector('.popup__container');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
  }

  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }

  _getDataFromInputs() {
    this._formData = {};
    this._inputList.forEach(item => {
      this._formData[item.name] = item.value;
    });

    console.log(this._formData);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getDataFromInputs());
      this.closePopup();
    });
  }

}
