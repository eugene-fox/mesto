import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._popup.querySelector('.popup__container');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._submitButton = this._formElement.querySelector('.popup__save-button');
    this.__submitButtonCaption = this._submitButton.textContent;
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
      // this.closePopup();
    });
  }

  showSaveState(isSaving) {
    if (isSaving) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this.__submitButtonCaption;
    }
  }

}
