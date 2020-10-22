let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let closeButton = popup.querySelector('.popup__close-button');
let saveButton = popup.querySelector('.popup__save-button');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_description');
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
  profileName.textContent = nameInput.value;;
  profileDescription.textContent = jobInput.value;
}

editButton.addEventListener('click', popupDisplay);
closeButton.addEventListener('click', popupDisplay);
formElement.addEventListener('submit', formSubmitHandler);
saveButton.addEventListener('click', popupDisplay);
