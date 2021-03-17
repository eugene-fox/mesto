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
const profileAvatarSelector = '.profile__avatar';

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

//Создаем элемент Api для взаимодействия с сервером
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
  headers: {
    'content-type': 'application/json',
    authorization: '233fa192-0365-43b1-9635-9ca57a07d48d'
  }
});



const profileFormValidator = new FormValidator(profileForm, validationConfig);
profileFormValidator.enableValidation();
const imageCardFormValidator = new FormValidator(imageCardForm, validationConfig);
imageCardFormValidator.enableValidation();

const userInformation = new UserInfo(profileName, profileDescription, nameInput, jobInput, profileAvatarSelector);

api.getInitialData()
  .then((data) => {
    const [userData, cardsData] = data;
    console.log(cardsData);
    // ownerId = userData._id;
    userInformation.setUserInfo(userData);
    userInformation.setUserAvatar(userData);
    initialCardsRender.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  })

//Создаем поп-ап редактирования профиля
const profileEditPopup = new PopupWithForm('profileEdit', () => {
  profileEditPopup.showSaveState(true);
  api.updateUserInfo({
      name: nameInput.value,
      description: jobInput.value
    })
    .then((res) => {
      userInformation.setUserInfo(res);
    })
    .finally(() => {
      //Закрываем поп ап как данные загрузились на сервер
      profileEditPopup.showSaveState(false);
      profileEditPopup.closePopup();
    })
});

profileEditPopup.setEventListeners();

//Добавили лисенер на кнопку редактирования профиля
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
function cardCreate(cardData) {
  const cardItem = new Card(cardData, templateElement, handleImageCardClick, () => {
      confirmDeletePopup.open(removeCard(card));
    },
    () => {
      api.setLikes(card.returnCardId()).then((res) => {
        console.log(res.likes.length);
        card.changeLikeCount(res.likes.length);
      });
    },
    () => {
      api.removeLike(card.returnCardId()).then((res) => {
        card.changeLikeCount(res.likes.length);
      });
    });
  return cardItem.composeCard();
}

//Реализуем отрисовку начальных карточек
const initialCardsRender = new Section((card) => {
  const newCardItem = cardCreate(card);
  initialCardsRender.addItem(newCardItem);
}, cardsContainerElement);

//Создаем поп-ап с добавлением карточки
const addImageCardPopup = new PopupWithForm('addCard', (card) => {
  addImageCardPopup.showSaveState(true);
  api.uploadCard(card)
  .then((res) => {
    const cardElement = createCard(res);
    initialCardsRender.addItem(cardElement);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    addImageCardPopup.showSaveState(false);
    addImageCardPopup.closePopup()
  })
  imageCardFormValidator.resetValidation();
});

addImageCardPopup.setEventListeners();

//Добавляем слушатель на кнопку добавления карточки
addButton.addEventListener('click', () => {
  imageCardFormValidator.resetValidation();
  addImageCardPopup.openPopup();
});

//=================================================================================
