const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_state_invalid',
  inputErrorClass: 'popup__input_state_invalid'
}

function showError(form, input, config) {
  const spanError = form.querySelector(`#${input.name}-error`);
  spanError.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
}

function hideError(form, input, config) {
  const spanError = form.querySelector(`#${input.name}-error`);
  spanError.textContent = "";
  input.classList.remove(config.inputErrorClass);
}

function checkInputValidity(form, input, config) {
  if (input.validity.valid) {
    hideError(form, input, config);
  } else {
    showError(form, input, config);
  }
}

function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

function setEventListeners(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputList.forEach(input => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(form, input, config);
      setButtonState(submitButton, form.checkValidity(), config);
    });
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(form => {
    setEventListeners(form, config);
    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config);
  });
}
