export default class Api {
  constructor(token, url, cohortId) {
    this._token = token;
    this._url = url;
    this._cohortId = cohortId;
  }

  //Получаем данные пользователя с сервера
  getUserInfo() {
    return fetch(`${this._url}${this._cohortId}/users/me`, {
        headers: {
          authorization: this._token
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  //Отправляем данные пользователя на сервер
  setUserInfo(userData) {
    console.log(userData);
    return fetch(`${this._url}${this._cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

}
