let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let textFields = popup.querySelectorAll('.popup__input');
let nameInput = textFields[0];
let jobInput = textFields[1];
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function popupFill() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function popupDisplay() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else {
    popupFill();
    popup.classList.add('popup_opened');
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  let newName = nameInput.value;
  let newJob = jobInput.value;

  profileName.textContent = newName;
  profileDescription.textContent = newJob;

}

editButton.addEventListener('click', popupDisplay);
popup.querySelector('.popup__close-button').addEventListener('click', popupDisplay);
formElement.addEventListener('submit', formSubmitHandler);
popup.querySelector('.popup__save-button').addEventListener('click', popupDisplay);
