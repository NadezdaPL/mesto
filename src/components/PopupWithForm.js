import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'))
    this._button = this._form.querySelector('.popup__button');
    this._buttonText = this._button.textContent;
  }

  _getInputValues() {
    const values = {}
    
    this._inputs.forEach(input => {
      const name = input.name
      const value = input.value

      values[name] = value
    })
    return values
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      const initialText = this._button.textContent;
      this._button.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this._button.textContent = initialText;
        })
    });
  }
  close() {
    this._form.reset();
    super.close()
  }
}