export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _onError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Промис выполнится тогда, когда выполнятся оба переданных аргумента, иначе будет отклонен
  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  //Получаем данные о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
        method: 'GET',
        headers: this._headers
      })
      .then(this._onError)
      .catch(err => console.log(err))
  }


  //Загружаем на сервер обновленную информацию
  updateUserInfo(data) {
    return fetch(`${this._url}users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.description
        })
      })
      .then(this._onError)
      .catch(err => console.log(err))
  }

  //Устанавливаем пользователю аватар
  setUserAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.url
        })
      })
      .then(this._onError)
      .catch(err => console.log(err))
  }

  getInitialCards() {
    return fetch(`${this._url}cards/`, {
        method: "GET",
        headers: this._headers
      })
      .then(this._onError)
      .catch(err => console.log(err))
  }

  deleteCard(data) {
    return fetch(`${this._url}cards/${data}`, {
        method: "DELETE",
        headers: this.headers,
      }).then(this._onError)
      .catch(err => console.log(err));
  }

  setLikes() {
    return fetch(`${this._url}cards/likes/${cardId}`, {
        method: "PUT",
        headers: this.headers,
      }).then(this._onError)
      .catch(err => console.log(err));
  }

  removeLike() {
    return fetch(`${this._url}cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this.headers,
      }).then(this._onError)
      .catch(err => console.log(err));
  }

  uploadCard(data){
    console.log(data);
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.place,
        link: data.url
      })
    })
    .then(this._checkResult)
    .catch(err => console.log(err))
  }


}
