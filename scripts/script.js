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


//функция добавляет слушателей кнопок и карточки
function addLikeDeleteView(card) {
  const deleteButton = card.querySelector('.place-card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  const likeButton = card.querySelector('.place-card__like-button');
  likeButton.addEventListener('click', toggleLike);
  const cardsItem = card.querySelector('.place-card__photo');
  cardsItem.addEventListener('click', openImagePopup);
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
  addLikeDeleteView(newCard);
  return newCard;
}

//Удаление карточки
function deleteCard(event) {
  event.target.closest('.place-card').remove();
}

//Функция активации/деактивации лайка
function toggleLike(event) {
  event.target.classList.toggle('place-card__like-button_active');
}

//Функция отрисовки карточек
function renderCards() {
  const cardsItems = initialCards.map(composeCard);
  cardsContainerElement.append(...cardsItems);
}

//Функция заполняет инпуты поп-апа редактирования профиля актуальными значениями
function popupFill(name, description) {
  name.value = profileName.textContent;
  description.value = profileDescription.textContent;
}

addPopup.querySelector('.popup__save-button_card').addEventListener('click', (evt) => {
  addImageCard();
  popupVisible(evt);
});

function popupVisible(event) {
  const targetPopup = event.target.closest('.popup')
  targetPopup.classList.toggle('popup_opened');
}

popupCloseButtons.forEach((button) => {
  button.addEventListener('click', popupVisible);
});

function openEditPopup() {
  editPopup.classList.add('popup_opened');
  popupFill(nameInput, jobInput);
  editPopup.querySelector('.popup__container').addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
  });
  editPopup.querySelector('.popup__save-button_profile').addEventListener('click', popupVisible);
}

function addImageCard() {
  const newImageCard = composeCard({
    name: placeName.value,
    link: placeImageUrl.value
  });
  cardsContainerElement.prepend(newImageCard);
  console.log(addPopup.querySelector('.popup__container'));
  addPopup.querySelector('.popup__container').reset();
}

function openAddPopup() {
  addPopup.classList.add('popup_opened');
  addPopup.querySelector('.popup__container').addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
}

//Функция открытие попапа с картинкой
function openImagePopup(event) {
  fullImageUrl.src = event.target.src;
  fullImageUrl.alt = event.target.alt;
  fullImageDesc.textContent = event.target.closest('.place-card').querySelector('.place-card__photo-name').textContent;
  addImagePopup.classList.add('popup_opened');
}

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);

renderCards();
