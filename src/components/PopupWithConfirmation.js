import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, cardDeleteHandler) {
    super(popupSelector);
    this._cardDeleteHandler = cardDeleteHandler;
    this._form = this._popupElement.querySelector(".popup__form");
    this._button = this._form.querySelector(".popup__button");
    this._buttonText = this._button.textContent;
  }

  open(cardItem) {
    this._card = cardItem;
    super.open();
  }

  _setLoading(loading, loadingText = "Удаление...") {
    if (loading) {
      this._button.textContent = loadingText;
    } else {
      this._button.textContent = this._buttonText;
    }
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._cardDeleteHandler(this._card);
      this._setLoading(true);
    });
    super.setEventListeners();
  }
}
