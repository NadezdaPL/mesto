export class UserInfo {
  constructor ({ nameSelector, infoSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector)
    this._info = document.querySelector(infoSelector)
    this._avatar = document.querySelector(avatarSelector)
    this._userId = null
  }

  getUserInfo() {
    return { name: this._name.textContent, info: this._info.textContent, avatar: this._avatar.src }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    this._avatar.src = data.avatar;
    this._userId = data._id
  }

  getUserId() {
    return this._userId
  }
}
