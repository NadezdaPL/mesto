import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageItem = this._popupElement.querySelector('.popup__image-item');
    this._popupImageTitle = this._popupElement.querySelector('.popup__image-title');
  }
  
  open(title, link) {
    this._popupImageItem.src = link;
    this._popupImageItem.alt = title;
    this._popupImageTitle.textContent = title;
    super.open()
  }
}