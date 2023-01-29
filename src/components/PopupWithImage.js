import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  
  open(title, link) {
    const popupImageItem = this._popupElement.querySelector('.popup__image-item');
    const popupImageTitle = this._popupElement.querySelector('.popup__image-title');
    popupImageItem.src = link;
    popupImageItem.alt = title;
    popupImageTitle.textContent = title;
    super.open()
  }
}