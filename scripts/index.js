//объявляем необходимые константы
const cardsContainerElement = document.querySelector('.galery__places');
const templateElement = document.querySelector('.card-template');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.getElementById('profileEdit');
const addPopup = document.getElementById('addCard');
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
function openImagePopup(event) {
  fullImageUrl.src = event.target.src;
  fullImageUrl.alt = event.target.alt;
  fullImageDesc.textContent = event.target.closest('.place-card').querySelector('.place-card__photo-name').textContent;
  openPopup(addImagePopup);
}

//Функция удаление карточки
function deleteCard(event) {
  event.target.closest('.place-card').remove();
}

//Функция активации/деактивации лайка
function toggleLike(event) {
  event.target.classList.toggle('place-card__like-button_active');
}

//Функция создания карточки
function composeCard({
  name,
  link
}) {
  const newCard = templateElement.content.cloneNode(true);
  const cardTitle = newCard.querySelector('.place-card__photo-name');
  const cardImage = newCard.querySelector('.place-card__photo');
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = `Изображение на котором изображено место ${name}`;
  //Добавляем новой карточки обработчики клика на Удаление, Лайк и открытие картинки карточки
  newCard.querySelector('.place-card__delete-button').addEventListener('click', deleteCard);
  newCard.querySelector('.place-card__like-button').addEventListener('click', toggleLike);
  newCard.querySelector('.place-card__photo').addEventListener('click', openImagePopup);
  return newCard;
}

//Функция отрисовки карточек
function renderCards(cards) {
  const cardsItems = cards.map(composeCard);
  cardsContainerElement.append(...cardsItems);
}

//Данная функция должна обрабатывать сабмит формы добавления карточки.
function addImageCard() {
  const newImageCard = composeCard({
    name: placeName.value,
    link: placeImageUrl.value
  });
  cardsContainerElement.prepend(newImageCard);
  addPopup.querySelector('.popup__container').reset();
  const targetButton = addPopup.querySelector('.popup__save-button');
  const targetForm =addPopup.querySelector('.popup__container');
  setButtonState(targetButton, targetForm.checkValidity(), validationConfig);
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
  const targetButton = editPopup.querySelector('.popup__save-button');
  const targtForm = editPopup.querySelector('.popup__container');
  setButtonState(targetButton, targtForm.checkValidity(), validationConfig);
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
  addImageCard();
});

//Вешаем обработчики на кнопки поп-апов, которые вызывают сабмит формы и в последсвии их закрывают
editPopup.querySelector('.popup__save-button_profile').addEventListener('click', () => {
  closePopup(editPopup);
});
addPopup.querySelector('.popup__save-button_card').addEventListener('click', () => {
  closePopup(addPopup);
});

enableValidation(validationConfig);
renderCards(initialCards);
