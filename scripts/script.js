const initialCards = [{
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

const cardsContainerElement = document.querySelector('.galery__places');
const templateElement = document.querySelector('.card-template');

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
  addLikeAndDelete(newCard);
  console.log(cardTitle.textContent, cardImage.src);
  return newCard;
}

function addLikeAndDelete(card) {
  const deleteButton = card.querySelector('.place-card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  const likeButton = card.querySelector('.place-card__like-button');
  likeButton.addEventListener('click', toggleLike);
}

//Удаление карточки
function deleteCard(event) {
  const targetCard = event.target.closest('.place-card');
  targetCard.remove();
}

//Функция активации/деактивации лайка
function toggleLike(event) {
  const likeItem = event.target;
  likeItem.classList.toggle('place-card__like-button_active');
}

function renderCards() {
  const cardsItems = initialCards.map(composeCard);
  cardsContainerElement.append(...cardsItems);
}

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function popupFill(name, description) {
  name.value = profileName.textContent;
  description.value = profileDescription.textContent;
}

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.getElementById('profileEdit');
const addPopup = document.getElementById('addCard');

addPopup.querySelector('.popup__save-button_card').addEventListener('click', (evt) => {
  addImageCard();
  popupVisible(evt);
});

const nameInput = editPopup.querySelector('.popup__input_type_name');
const jobInput = editPopup.querySelector('.popup__input_type_description');

const placeName = document.querySelector('.popup__input_type_place-name');
const placeImageUrl = document.querySelector('.popup__input_type_image-link');

function popupVisible(event) {
  const targetPopup = event.target.closest('.popup')
  targetPopup.classList.toggle('popup_opened');
}

const popupCloseButtons = document.querySelectorAll('.popup__close-button');
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
  const newImageCard = composeCard({name: placeName.value, link: placeImageUrl.value});
  cardsContainerElement.prepend(newImageCard);
  placeName.value = '';
  placeImageUrl.value = '';
}

function openAddPopup() {
  addPopup.classList.add('popup_opened');
  addPopup.querySelector('.popup__container').addEventListener('submit', (evt) => {
    evt.preventDefault();
    // console.log(evt);
  });
}

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);

renderCards();
