export default class Card {
  constructor(cardData, cardTemplate, handleCardClick, userId, handleCardDeleteClick, confirmDeletePopup) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData.cardId;
    this._cardCreatorId = cardData.cardCreatorId;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._deleteCard = this._deleteCard.bind(this);
    this._userId = userId;
    this._cardId = cardData.cardId;

    this._confirmDeletePopup = confirmDeletePopup;
  }

  //Получаем разметку карточки
  _getTemplate() {
    return this._cardTemplate.content.cloneNode(true);
  }

  //Вешаем слушателей событий
  _setEventListeners(cardIsMy) {

    //Если карточка не пользователя, тогда слушатель не вешаем
    if (cardIsMy) {
      this._element.querySelector('.place-card__delete-button').addEventListener('click', (evt) => {
        this._confirmDeletePopup.openPopup();
        this._handleCardDeleteClick(this._cardId);
        this._deleteCard(evt);
      });
    }

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

    const deleteButton = this._element.querySelector('.place-card__delete-button');
    let cardIsMy = true;
    //Сравниваем айдишники пользователя и создателя, если отличаются не отображаем кнопку удаления
    if (this._cardCreatorId != this._userId) {
      console.log('скрываю кнопку\n', this._cardCreatorId, '\n', this._userId, this._cardId);
      deleteButton.classList.add('place-card__delete-button_hidden');
      cardIsMy = false;
    }

    this._setEventListeners(cardIsMy);
    return this._element;
  }
}
