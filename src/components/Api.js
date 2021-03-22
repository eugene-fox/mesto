import { data } from "autoprefixer";

export default class Api {
  constructor(token, url, cohortId) {
    this._token = token;
    this._url = url;
    this._cohortId = cohortId;
  }

  //Получаем данные пользователя с сервера
  getUserInfo() {
    fetch(`${this._url}${this._cohortId}/users/me`, {
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
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  setUserInfo() {

  }
}
