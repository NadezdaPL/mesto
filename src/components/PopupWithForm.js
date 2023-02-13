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
    super.setEventListeners()
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      this._handleFormSubmit(this._getInputValues());
      this._setLoading(true);
      this.close();
    })
  }

  close() {
    this._form.reset();
    super.close()
  }

  _setLoading(loading, loadingText = 'Сохранение...') {
    if (loading) {
      this._button.textContent = loadingText
    } else {
      this._button.textContent = this._buttonText
    }
  }
}