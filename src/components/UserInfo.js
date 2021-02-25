export default class UserInfo {
  constructor(profileName, profileDescription, newProfileName, newProfileDescription) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._newProfileName = document.querySelector(newProfileName);
    this._newProfileDescription = document.querySelector(newProfileDescription);
  }

  getUserInfo() {
    console.log(this._profileName.textContent, this._profileDescription.textContent, this._newProfileName.value, this._newProfileDescription.value);
    this._newProfileName.value = this._profileName.textContent;
    this._newProfileDescription.value = this._profileDescription.textContent;
  }

  setUserInfo() {
    this._profileName.textContent = this._newProfileName.value;
    this._profileDescription.textContent = this._newProfileDescription.value;
  }
}
