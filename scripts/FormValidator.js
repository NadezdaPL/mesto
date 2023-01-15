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
    if(!input.checkValidity()) {
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

  toggleSubmitButton = (buttonElement) => {
    if(this._form.checkValidity()) {
      buttonElement.disabled = false
      buttonElement.classList.remove(this._inactiveButtonClass);
    } else {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true
    }
  }

  _setEventListener() {
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    this.toggleSubmitButton(buttonElement)
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleSubmitButton(buttonElement);
      })
    })
  }

  enableValidation = () => {
    this._setEventListener()
  }
}