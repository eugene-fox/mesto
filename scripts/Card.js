export class Card {
  constructor(cardData, cardTemplate, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  //Получаем разметку карточки
  _getTemplate() {
    return this._cardTemplate.content.cloneNode(true);
  }

  //Вешаем слушателей событий
  _setEventListeners() {
    this._element.querySelector('.place-card__delete-button').addEventListener('click', this._deleteCard);
    this._element.querySelector('.place-card__like-button').addEventListener('click', this._toggleLike);
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

    //Метод удаление карточки
    _deleteCard(event) {
      event.target.closest('.place-card').remove();
      this._element = null;
    }

    //Метод активации/деактивации лайка
    _toggleLike(event) {
      event.target.classList.toggle('place-card__like-button_active');
    }

  //Метод создания карточки
  composeCard() {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.place-card__photo-name');
    this._elementImage = this._element.querySelector('.place-card__photo');
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = `Изображение на котором изображено место ${this._name}`;
    this._setEventListeners();
    return this._element;
  }
}
