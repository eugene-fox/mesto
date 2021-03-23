export default class UserInfo {
  // constructor(profileName, profileDescription, profilePicture, newProfileName, newProfileDescription) {
  //   this._profileName = document.querySelector(profileName);
  //   this._profileDescription = document.querySelector(profileDescription);
  //   this._profilePicture = document.querySelector(profilePicture);
  //   this._newProfileName = newProfileName;
  //   this._newProfileDescription = newProfileDescription;
  // }

  constructor(profileName, profileDescription, profilePicture) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._profilePicture = document.querySelector(profilePicture);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    }
    return userInfo;
  }

  //старая версия
  // setUserInfo() {
  //   this._profileName.textContent = this._newProfileName.value;
  //   this._profileDescription.textContent = this._newProfileDescription.value;
  // }

  //На вход объект с информацией о пользователе
  setUserInfo({newProfileName, newProfileDescription, newProfilePicture}) {
    //Если какой то параметр не будет передан, соответсвующее свойство не будет изменено
    if (newProfileName) this._profileName.textContent = newProfileName;
    if (newProfileDescription) this._profileDescription.textContent = newProfileDescription;
    if (newProfilePicture) this._profilePicture.src = newProfilePicture;
  }
}
