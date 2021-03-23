import './index.css'; // добавили импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  initialCards,
  validationConfig,
} from '../utils/constants.js';

//объявляем необходимые константы
const cardsContainerElement = document.querySelector('.galery__places');
const templateElement = document.querySelector('.card-template');

const profileName = '.profile__name';
const profileDescription = '.profile__description';
const profilePicture = '.profile__avatar-picture';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.getElementById('profileEdit');
const addPopup = document.getElementById('addCard');
const profileForm = editPopup.querySelector('.popup__container_profile');
const imageCardForm = addPopup.querySelector('.popup__container_card');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const placeName = document.querySelector('.popup__input_type_place-name');
const placeImageUrl = document.querySelector('.popup__input_type_image-link');

//=================================================================================

const api = new Api('233fa192-0365-43b1-9635-9ca57a07d48d', 'https://mesto.nomoreparties.co/v1/', 'cohort-20');

const profileFormValidator = new FormValidator(profileForm, validationConfig);
profileFormValidator.enableValidation();
const imageCardFormValidator = new FormValidator(imageCardForm, validationConfig);
imageCardFormValidator.enableValidation();

//Создаем объект с информацией о пользователе
const userInformation = new UserInfo(profileName, profileDescription, profilePicture);

//Создаем поп-ап редактирования профиля
const profileEditPopup = new PopupWithForm('profileEdit', () => {
  api.setUserInfo({
      name: nameInput.value,
      about: jobInput.value
    })
    .then(data => userInformation.setUserInfo({
      newProfileName: data.name,
      newProfileDescription: data.about
    }))
    .catch(err => console.log(err));
});

profileEditPopup.setEventListeners();

//вешаем слушателя на кнопку редактирования профиля
editButton.addEventListener("click", () => {
  const userInfo = userInformation.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.description;
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

//Получаем данные о пользователе с сервера при загрузке страницы
api.getUserInfo()
  .then(userData => {
    console.log('Из index.js')
    console.log(userData);
    userInformation.setUserInfo({
      newProfileName: userData.name,
      newProfileDescription: userData.about,
      newProfilePicture: userData.avatar
    });
  })
  .catch(err => console.log(err));
