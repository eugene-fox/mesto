import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';

import {
  initialCards,
  validationConfig,
  cardsContainerElement,
  templateElement,
  profileName,
  profileDescription,
  editButton,
  addButton,
  editPopup,
  addPopup,
  profileForm,
  imageCardForm,
  addImagePopup,
  nameInput,
  jobInput,
  placeName,
  placeImageUrl,
  popupCloseButtons,
  fullImageUrl,
  fullImageDesc,
} from '../utils/constants.js';

//Универсальные функции открытия и закрытия поп-апов
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   popup.addEventListener('click', closePopupByOverlayClick);
//   document.addEventListener('keydown', closePopupByEscPress);
// }

// function closePopupByOverlayClick(evt) {
//   closePopup(evt.target);
// }

// function closePopupByEscPress(evt) {
//   if (evt.key === 'Escape') {
//     const targetPopup = document.querySelector('.popup_opened');
//     closePopup(targetPopup);
//   }
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   popup.removeEventListener('click', closePopupByOverlayClick);
//   document.removeEventListener('keydown', closePopupByEscPress);
// }

//Функция открытие попапа с картинкой
function openImagePopup(name, link) {
  fullImageUrl.src = link;
  fullImageUrl.alt = name;
  fullImageDesc.textContent = name;
  openPopup(addImagePopup);
}
//=================================================================================
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
//=================================================================================

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

// popupCloseButtons.forEach((button) => {
//       //   button.addEventListener('click', (evt) => {
//       //     const targetPopup = evt.target.closest('.popup');
//       //     closePopup(targetPopup);
//       //   });
//       });

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

      // enableValidation(validationConfig);
      const profileFormValidator = new FormValidator(profileForm, validationConfig);
      profileFormValidator.enableValidation();
      const imageCardFormValidator = new FormValidator(imageCardForm, validationConfig);
      imageCardFormValidator.enableValidation();
