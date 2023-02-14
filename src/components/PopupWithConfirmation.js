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

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const initialText = this._button.textContent;
      this._button.textContent = 'Удаление...';
      this._cardDeleteHandler(this._card)
        .then(() => this.close())
        .finally(() => {
          this._button.textContent = initialText;
        })
    });
    super.setEventListeners();
  }
}
