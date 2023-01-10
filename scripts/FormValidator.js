export class FormValidator {
  constructor(validationConfig, form) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._form = form;
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  _checkInputValidity = (input) => {
    if(!input.validity.valid) {
      this._showError(input, input.validationMessage)
    } else {
      this._hideError(input)
    }
  }

  _showError(input, errorMessage) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isInputValid() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  _toggleSubmitButton = () => {
    if(this._isInputValid()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.setAttribute('disabled', true)
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.removeAttribute('disabled')
    }
  }

  _setEventListener() {
    this._toggleSubmitButton()
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleSubmitButton();
      })
    })
  }

  enableValidation = () => {
    this._setEventListener()
  }
}