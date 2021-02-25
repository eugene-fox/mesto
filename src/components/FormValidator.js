export default class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._config = config;
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    this._inputList = (this._form.querySelectorAll(this._config.inputSelector));
  }

  _showError(input) {
    const spanError = this._form.querySelector(`#${input.name}-error`);
    spanError.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError(input) {
    const spanError = this._form.querySelector(`#${input.name}-error`);
    spanError.textContent = "";
    input.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _setButtonState(button, isActive, config) {
    if (isActive) {
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(config.inactiveButtonClass);
      button.disabled = true;
    }
  }

  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', (evt) => {
        this._checkInputValidity(input);
        this._setButtonState(this._submitButton, this._form.checkValidity(), this._config);
      });
    });
  }

  resetValidation() {
    this._setButtonState(this._submitButton, this._form.checkValidity(), this._config);
    this._inputList.forEach((input) => {
      this._hideError(input);
    });
  }

  enableValidation() {
    this._setEventListeners(this._form, this._config);
    this._setButtonState(this._submitButton, this._form.checkValidity(), this._config);
  }
}
