export default class UserInfo {
  constructor(profileName, profileDescription, newProfileName, newProfileDescription) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._newProfileName = newProfileName;
    this._newProfileDescription = newProfileDescription;
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    }
    return userInfo;
  }

  setUserInfo() {
    this._profileName.textContent = this._newProfileName.value;
    this._profileDescription.textContent = this._newProfileDescription.value;
  }
}
