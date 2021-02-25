import './index.css'; // добавьте импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  validationConfig,
  cardsContainerElement,
  templateElement,
  profileName,
  profileDescription,
  editButton,
  addButton,
  profileForm,
  imageCardForm,
  nameInput,
  jobInput,
  placeName,
  placeImageUrl,
} from '../utils/constants.js';

//=================================================================================

const profileFormValidator = new FormValidator(profileForm, validationConfig);
profileFormValidator.enableValidation();
const imageCardFormValidator = new FormValidator(imageCardForm, validationConfig);
imageCardFormValidator.enableValidation();

const userInformation = new UserInfo(profileName, profileDescription, nameInput, jobInput);

//Создаем поп-ап редактирования профиля
const profileEditPopup = new PopupWithForm('profileEdit', () => {
  userInformation.setUserInfo();
});

profileEditPopup.setEventListeners();

editButton.addEventListener("click", () => {
	userInformation.getUserInfo();
	profileFormValidator.resetValidation();
	profileEditPopup.openPopup();
});

//Создаем поп-ап с картинкой
const imagePopup = new PopupWithImage('fullSizeImage');
imagePopup.setEventListeners();

export function handleImageCardClick(name, link) {
  imagePopup.openPopup(name, link);
}

//Функция создает и возвращает готовую карточку с использованием метода класса Card
function cardCreate(card) {
  const cardItem = new Card(card, templateElement, handleImageCardClick);
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

//Создаем поп-ап с добавлением карточки
const addImageCardPopup = new PopupWithForm('addCard', () => {
  const newCardItem = cardCreate({
    name: placeName.value,
    link: placeImageUrl.value
  });
  initialCardsRender.addItem(newCardItem);
  imageCardFormValidator.resetValidation();
});

addImageCardPopup.setEventListeners();

//Добавляем слушатель на кнопку добавления карточки
addButton.addEventListener('click', () => {
  imageCardFormValidator.resetValidation();
  addImageCardPopup.openPopup();
});

//=================================================================================

