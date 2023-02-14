export class FormValidator {
  constructor(validationConfig, formElement) {
    this._formElement = formElement;
    this._inputSelector = validationConfig.inputSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._submitButtonElement = this._formElement.querySelector(validationConfig.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _checkInputValidity = (input) => {
    if(!input.checkValidity()) {
      this._showError(input, input.validationMessage)
    } else {
      this._hideError(input)
    }
  }

  _showError(input, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isInputValid() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  toggleSubmitButton = () => {
    if(this._formElement.checkValidity()) {
      this._submitButtonElement.disabled = false
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    } else {
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
      this._submitButtonElement.disabled = true
    }
  }

  _setEventListener() {
    this.toggleSubmitButton(this._submitButton)
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleSubmitButton(this._submitButton);
      })
    })
  }

  resetValidation = () => {
    this.toggleSubmitButton;
    this._inputList.forEach((input) => {
      this._hideError(input)
    });

  }

  enableValidation = () => {
    this._setEventListener()
  }
}