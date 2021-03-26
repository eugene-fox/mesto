import PopupWithForm from './PopupWithForm.js';

export default class PopupWithConfirm extends PopupWithForm {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._popup.querySelector('.popup__container');
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('Нажали на кнопку!');
      this._formSubmitHandler(this._cardId, this._targetCard);
    });
  }

  setSubmitHandler(submitHandler){
    this._formSubmitHandler = submitHandler;
  }
}
