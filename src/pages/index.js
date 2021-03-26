import './index.css'; // добавили импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
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
const avatarEditButton = document.querySelector('.profile__avatar-edit');

const editPopup = document.getElementById('profileEdit');
const addPopup = document.getElementById('addCard');
const avatarEditPopup = document.getElementById('updateAvatar');
const profileForm = editPopup.querySelector('.popup__container_profile');
const imageCardForm = addPopup.querySelector('.popup__container_card');
const avatarEditFrom = avatarEditPopup.querySelector('.popup__container_avatar-edit')

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const avatarUrlInput = document.querySelector('.popup__input_type_avatar-url')

const placeName = document.querySelector('.popup__input_type_place-name');
const placeImageUrl = document.querySelector('.popup__input_type_image-link');

//=================================================================================

const api = new Api('233fa192-0365-43b1-9635-9ca57a07d48d', 'https://mesto.nomoreparties.co/v1/', 'cohort-20');

let currentUserId = null;

const profileFormValidator = new FormValidator(profileForm, validationConfig);
profileFormValidator.enableValidation();
const imageCardFormValidator = new FormValidator(imageCardForm, validationConfig);
imageCardFormValidator.enableValidation();
const avatarEditFormValidator = new FormValidator(avatarEditFrom, validationConfig);
avatarEditFormValidator.enableValidation();

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

//Создаем поп-ап формы обновления аватара
const profileAvatarEditPopup = new PopupWithForm('updateAvatar', () => {
  console.log(avatarUrlInput.value);
  api.updataAvatar({
      avatar: avatarUrlInput.value
    })
    .then(data => {
      userInformation.setUserInfo({
        newProfilePicture: data.avatar,
      })
    })
    .catch(err => console.log(err));
});

profileAvatarEditPopup.setEventListeners();

//Вешаем слушателя клика на кнопку изменения аватара
avatarEditButton.addEventListener('click', () => {
  const userInfo = userInformation.getUserInfo();
  console.log(userInfo);
  avatarUrlInput.value = userInfo.avatar;
  avatarEditFormValidator.resetValidation()
  profileAvatarEditPopup.openPopup();
})

//Создаем поп-ап с картинкой
const imagePopup = new PopupWithImage('fullSizeImage');
imagePopup.setEventListeners();

//Создаем поп-ап подтверждения удаления карточки
const confirmDeletePopup = new PopupWithConfirm('deleteConfirm', (cardId) => {



});

confirmDeletePopup.setEventListeners();

export function handleImageCardClick(name, link) {
  imagePopup.openPopup(name, link);
}

//Функция создает и возвращает готовую карточку с использованием метода класса Card
function cardCreate(cardData) {
  const cardItem = new Card(cardData, templateElement, handleImageCardClick, currentUserId, confirmDeletePopup, {
    handleCardDeleteClick: (cardId, event) => {

      console.log('Тут по идее карточка удвлилась!!');

      confirmDeletePopup.setSubmitHandler(() => {
        api.deleteCard(cardId)
          .then(() => {
            cardItem.deleteCard(event);
            confirmDeletePopup.closePopup();
          })
          .then(() => console.log('Карточка успешно удалена'))
          .catch((err) => {
            console.log(err);
          })
      })

      confirmDeletePopup.openPopup();



      // confirmDeletePopup.openPopup(cardId, evt);
      // cardItem.deleteCard();
      // api.deleteCard(cardId).then(() => console.log('Карточка удалилась)'));
    },
    handleLikeAdd: (cardId) => {
      api.addLike(cardId)
        .then(res => {
          cardItem.updateLikes(res.likes);
        })
        .then(() => console.log('Добавление лайка прошло успешно'))
        .catch(err => console.log(err));
    },
    handleLikeRemove: (cardId) => {
      api.removeLike(cardId)
        .then(res => {
          cardItem.updateLikes(res.likes);
        })
        .then(() => console.log('Удаление лайка прошло успешно'))
        .catch(err => console.log(err));
    }
  });
  return cardItem.composeCard();
}

//Реализуем отрисовку карточек
const cardRender = new Section({
    renderer: (cardData) => {
      const newCardItem = cardCreate(cardData);
      cardRender.addItem(newCardItem);
    }
  },
  cardsContainerElement
);

//Создаем поп-ап с добавлением карточки
const addImageCardPopup = new PopupWithForm('addCard', () => {
  api.addCard({
      name: placeName.value,
      link: placeImageUrl.value
    })
    .then((cardData) => {
      const newCardItem = cardCreate(cardData);
      cardRender.addItem(newCardItem);
      imageCardFormValidator.resetValidation();
    });
});

addImageCardPopup.setEventListeners();

//Добавляем слушатель на кнопку добавления карточки
addButton.addEventListener('click', () => {
  imageCardFormValidator.resetValidation();
  addImageCardPopup.openPopup();
});

//=================================================================================

//Получаем данные о пользователе и карточки с сервера при загрузке страницы
//all ждет выполнения всех промисов
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cardData]) => {

    //Записываем текущего пользователя
    currentUserId = userData._id;

    userInformation.setUserInfo({
      newProfileName: userData.name,
      newProfileDescription: userData.about,
      newProfilePicture: userData.avatar
    });

    cardRender.renderItems(cardData);
  }).catch(err => console.log(err));
