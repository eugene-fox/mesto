export default class UserInfo {
  constructor(profileName, profileDescription, newProfileName, newProfileDescription, profileAvatar) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._newProfileName = newProfileName;
    this._newProfileDescription = newProfileDescription;
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    }
    return userInfo;
  }

  setUserInfo(userInfo) {
    // this._profileName.textContent = this._newProfileName.value;
    // this._profileDescription.textContent = this._newProfileDescription.value;
    this._profileName.textContent = userInfo.name;
    this._profileDescription.textContent = userInfo.about;
  }

  setUserAvatar(avatarUrl) {
    this._profileAvatar = avatarUrl;
  }
}
