import {
  initialCards
} from './initialCards.js';
import {
  Card
} from './Card.js';
import {
  FormValidator
} from './FormValidator.js';

//объявляем необходимые константы
const cardsContainerElement = document.querySelector('.galery__places');
const templateElement = document.querySelector('.card-template');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.getElementById('profileEdit');
const addPopup = document.getElementById('addCard');
const profileForm = editPopup.querySelector('.popup__container_profile');
const imageCardForm = addPopup.querySelector('.popup__container_card');

const addImagePopup = document.getElementById('fullSizeImage');

const nameInput = editPopup.querySelector('.popup__input_type_name');
const jobInput = editPopup.querySelector('.popup__input_type_description');

const placeName = document.querySelector('.popup__input_type_place-name');
const placeImageUrl = document.querySelector('.popup__input_type_image-link');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const fullImageUrl = document.querySelector('.popup__image');
const fullImageDesc = document.querySelector('.popup__image-title');

//Универсальные функции открытия и закрытия поп-апов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByOverlayClick);
  document.addEventListener('keydown', closePopupByEscPress);
}

function closePopupByOverlayClick(evt) {
  closePopup(evt.target);
}

function closePopupByEscPress(evt) {
  if (evt.key === 'Escape') {
    const targetPopup = document.querySelector('.popup_opened');
    closePopup(targetPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupByOverlayClick);
  document.removeEventListener('keydown', closePopupByEscPress);
}

//Функция открытие попапа с картинкой
function openImagePopup(name, link) {
  fullImageUrl.src = link;
  fullImageUrl.alt = name;
  fullImageDesc.textContent = name;
  openPopup(addImagePopup);
}
//Функция отрисовки карточек при инициализации страницы
function initialCardsRender(cards, template, handleCardClick) {
  const cardClasses = cards.map((card) => (new Card(card, template, handleCardClick)));
  const cardsItems = cardClasses.map((card) => (card.composeCard()));
  cardsContainerElement.append(...cardsItems);
}

//Данная функция должна обрабатывать сабмит формы добавления карточки.
function addImageCard(template) {
  const newImageCard = new Card({
    name: placeName.value,
    link: placeImageUrl.value
  }, template, openImagePopup);
  cardsContainerElement.prepend(newImageCard.composeCard());
  imageCardForm.reset();
  imageCardFormValidator.resetValidation();
}

popupCloseButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    const targetPopup = evt.target.closest('.popup');
    closePopup(targetPopup);
  });
});

function openEditPopup() {
  openPopup(editPopup);
  //заполняем инпуты поп-апа редактирования профиля актуальными значениями
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  profileFormValidator.resetValidation();
}

//Вешаем обработчики кнопки поп-апа редактирования и добавления
editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

//Вешаем обработчик на сабмит формы редактирования профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
});

//Вешаем обработчик на сабмит формы добавления карточки с фото
imageCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addImageCard(templateElement);
  closePopup(addPopup);
});

const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_state_invalid',
  inputErrorClass: 'popup__input_state_invalid'
}

// enableValidation(validationConfig);
const profileFormValidator = new FormValidator(profileForm, validationConfig);
profileFormValidator.enableValidation();
const imageCardFormValidator = new FormValidator(imageCardForm, validationConfig);
imageCardFormValidator.enableValidation();

initialCardsRender(initialCards, templateElement, openImagePopup);
