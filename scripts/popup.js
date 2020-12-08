// let editButton = document.querySelector('.profile__edit-button');
// let popup = document.querySelector('.popup');
// let formElement = popup.querySelector('.popup__container');
// let closeButton = popup.querySelector('.popup__close-button');
// let saveButton = popup.querySelector('.popup__save-button');
// let nameInput = popup.querySelector('.popup__input_type_name');
// let jobInput = popup.querySelector('.popup__input_type_description');
// let profileName = document.querySelector('.profile__name');
// let profileDescription = document.querySelector('.profile__description');

// function popupFill() {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileDescription.textContent;
// }

// function popupDisplay() {
//   if (popup.classList.contains('popup_opened')) {
//     popup.classList.remove('popup_opened');
//   } else {
//     popupFill();
//     popup.classList.add('popup_opened');
//   }
// }

// function formSubmitHandler(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileDescription.textContent = jobInput.value;
// }

// editButton.addEventListener('click', popupDisplay);
// closeButton.addEventListener('click', popupDisplay);
// formElement.addEventListener('submit', formSubmitHandler);
// saveButton.addEventListener('click', popupDisplay);


let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function popupFill(name, description) {
  name.value = profileName.textContent;
  description.value = profileDescription.textContent;
}

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.getElementById('profileEdit');
const addPopup = document.getElementById('addCard');

const nameInput = editPopup.querySelector('.popup__input_type_name');
const jobInput = editPopup.querySelector('.popup__input_type_description');

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

function popupVisible(event) {
  const targetPopup = event.target.closest('.popup')
  targetPopup.classList.toggle('popup_opened');
}

const popupCloseButtons = document.querySelectorAll('.popup__close-button');
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', popupVisible);
});

function openEditPopup() {
  editPopup.classList.add('popup_opened');
  popupFill(nameInput, jobInput);
  editPopup.querySelector('.popup__container').addEventListener('submit', formSubmitHandler);
  editPopup.querySelector('.popup__save-button').addEventListener('click', popupVisible);
}

function openAddPopup() {
  addPopup.classList.add('popup_opened');
}

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
