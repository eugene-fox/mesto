export default class UserInfo {
  constructor(profileName, profileDescription, profilePicture) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._profilePicture = document.querySelector(profilePicture);
  }

  getUserInfo() {
    console.log(this._profilePicture);
    const userInfo = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
      avatar: this._profilePicture.src
    }
    return userInfo;
  }

  //На вход объект с информацией о пользователе
  setUserInfo({newProfileName, newProfileDescription, newProfilePicture}) {
    //Если какой то параметр не будет передан, соответсвующее свойство не будет изменено
    if (newProfileName) this._profileName.textContent = newProfileName;
    if (newProfileDescription) this._profileDescription.textContent = newProfileDescription;
    if (newProfilePicture) this._profilePicture.src = newProfilePicture;
  }
}
