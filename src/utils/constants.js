export const initialCards = [{
    name: 'Где то далеко',
    link: 'https://picsum.photos/1920/1080?random=1'
  },
  {
    name: 'Там, где нас нет',
    link: 'https://picsum.photos/1920/1080?random=2'
  },
  {
    name: 'Случайное место',
    link: 'https://picsum.photos/1920/1080?random=3'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_state_invalid',
  inputErrorClass: 'popup__input_state_invalid'
}

//объявляем необходимые константы
export const cardsContainerElement = document.querySelector('.galery__places');
export const templateElement = document.querySelector('.card-template');

export const profileName = '.profile__name';
export const profileDescription = '.profile__description';

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

export const editPopup = document.getElementById('profileEdit');
export const addPopup = document.getElementById('addCard');
export const profileForm = editPopup.querySelector('.popup__container_profile');
export const imageCardForm = addPopup.querySelector('.popup__container_card');

export const addImagePopup = document.getElementById('fullSizeImage');//не нужен больше

export const nameInput = '.popup__input_type_name';
export const jobInput = '.popup__input_type_description';

export const placeName = document.querySelector('.popup__input_type_place-name');
export const placeImageUrl = document.querySelector('.popup__input_type_image-link');

export const popupCloseButtons = document.querySelectorAll('.popup__close-button');

export const fullImageUrl = document.querySelector('.popup__image');
export const fullImageDesc = document.querySelector('.popup__image-title');