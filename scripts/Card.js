export class Card {
  constructor(cardData, cardTemplate) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardTemplate = cardTemplate;
  }

  //Получаем разметку
  _getTemplate() {
    return this._cardTemplate.content.cloneNode(true);
  }

  //Вешаем слушателей событий
  _setEventListeners() {

  }

  //Функция создания карточки
  composeCard() {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.place-card__photo-name');
    this._elementImage = this._element.querySelector('.place-card__photo');

    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = `Изображение на котором изображено место ${this._name}`;

    this._setEventListeners();

    // console.log(this._element);

    return this._element;
  }
}
