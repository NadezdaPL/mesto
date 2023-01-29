export class UserInfo {
  constructor ({ userTitleSelector, userTextSelector }) {
    this._profileTitle = document.querySelector(userTitleSelector)
    this._profileText = document.querySelector(userTextSelector)
  }

  getUserInfo() {
    return { title: this._profileTitle.textContent, text: this._profileText.textContent }
  }

  setUserInfo(title, text) {
    this._profileTitle.textContent = title
    this._profileText.textContent = text
  }
}
