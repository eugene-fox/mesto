import {
  initialCards
} from './initialCards.js';
import {
  Card
} from './Card.js';
import {
  FormValidator
} from './FormValidator.js';
import Section from './Section.js';

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

//Функция создает и возвращает готовую карточку с использованием метода класса Card
function cardCreate(card) {
  const cardItem = new Card(card, templateElement, openImagePopup); //???
  return cardItem.composeCard();
}

//Реализуем отрисовку начальных карточек
const initialCardsRender = new Section({
    items: initialCards,
    renderer: (card) => {
      const newCardItem = cardCreate(card);
      initialCardsRender.addItem(newCardItem);
    }
  },
  cardsContainerElement
);

//Вызываем отрисовку начальных карточек
initialCardsRender.renderItems();

//Данная функция должна обрабатывать сабмит формы добавления карточки.
function addImageCard(template) {
  const newImageCard = new Card({
    name: placeName.value,
    link: placeImageUrl.value
  }, template, openImagePopup);
  cardsContainerElement.prepend(newImageCard.composeCard());
  addPopup.querySelector('.popup__container').reset();
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
editPopup.querySelector('.popup__container').addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
});

//Вешаем обработчик на сабмит формы добавления карточки с фото
addPopup.querySelector('.popup__container').addEventListener('submit', (evt) => {
  evt.preventDefault();
  addImageCard(templateElement);
});

//Вешаем обработчики на кнопки поп-апов, которые вызывают сабмит формы и в последсвии их закрывают
editPopup.querySelector('.popup__save-button_profile').addEventListener('click', () => {
  closePopup(editPopup);
});
addPopup.querySelector('.popup__save-button_card').addEventListener('click', () => {
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
