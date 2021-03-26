export default class Card {
  constructor(cardData, cardTemplate, handleCardClick, userId, confirmDeletePopup, {
    handleCardDeleteClick,
    handleLikeAdd,
    handleLikeRemove,
  }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._cardCreatorId = cardData.owner._id;
    this._cardLikes = cardData.likes;
    this._cardTemplate = cardTemplate;

    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;

    this._handleLikeAdd = handleLikeAdd;
    this._handleLikeRemove = handleLikeRemove;

    this._userId = userId;

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
      this._element.querySelector('.place-card__delete-button').addEventListener('click', (event) => {
        console.log('Пришли в кард, открыли поп ап');
        this._handleCardDeleteClick(this._cardId, event);
      });
    }

    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('place-card__like-button_active')) {
        this._handleLikeRemove(this._cardId);
      } else {
        this._handleLikeAdd(this._cardId);
      }
    });

    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  //на вход массив с пользователями, которые поставили лайк
  updateLikes(likesData) {
    this._cardLikes = likesData;
    this._likeCounter.textContent = this._cardLikes.length;
    this._isLiked();
  }

  //Функция первоначальной проверки лайков
  _isLiked() {
    this._likeCounter.textContent = this._cardLikes.length;
    if (this._cardLikes.length === 0) {
      this._likeButton.classList.remove('place-card__like-button_active');
    }

    this._cardLikes.forEach((likers) => {
      if (likers._id === this._userId) {
        this._likeButton.classList.add('place-card__like-button_active');
      } else {
        this._likeButton.classList.remove('place-card__like-button_active');
      }
    });
  }

  //Метод создания карточки
  composeCard() {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.place-card__photo-name');
    this._elementImage = this._element.querySelector('.place-card__photo');
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = `Изображение на котором изображено место ${this._name}`;

    this._likeButton = this._element.querySelector('.place-card__like-button');
    this._likeCounter = this._element.querySelector('.place-card__like-count');

    const deleteButton = this._element.querySelector('.place-card__delete-button');

    let cardIsMy = null;
    //Сравниваем айдишники пользователя и создателя, если отличаются не отображаем кнопку удаления
    if (this._cardCreatorId !== this._userId) {
      deleteButton.classList.add('place-card__delete-button_hidden');
      cardIsMy = false;
    } else {
      cardIsMy = true;
    }

    this._setEventListeners(cardIsMy);
    this._isLiked();
    return this._element;
  }

  // Метод удаление карточки
  deleteCard(event) {
    event.target.closest('.place-card').remove();
    this._element = null;
  }
}
