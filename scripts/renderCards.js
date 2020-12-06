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
  return newCard;
}

function renderCards() {
  const cardsItems = initialCards.map(composeCard);
  cardsContainerElement.append(...cardsItems);
}

renderCards();
