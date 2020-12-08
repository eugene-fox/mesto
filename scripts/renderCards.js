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
  console.log(event);
  const likeItem = event.target;
  likeItem.classList.toggle('place-card__like-button_active');
}

function renderCards() {
  const cardsItems = initialCards.map(composeCard);
  cardsContainerElement.append(...cardsItems);
}

renderCards();
