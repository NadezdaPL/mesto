const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

const enableValidation = (validationConfig) => {
  const forms = [...document.querySelectorAll(validationConfig.formSelector)];

  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(validationConfig.inputSelector)];
    const button = form.querySelector(validationConfig.submitButtonSelector);
  
    form.addEventListener('submit', (e) => {
      e.preventDefault()
    })
  
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input, validationConfig);
        toggleSubmitButton(inputs, button, validationConfig);
      })
    })
  })
};

const checkInputValidity = (input, validationConfig) => {
  const errorElement = document.querySelector(`#${input.id}-error`);
    if(input.validity.valid) {
      errorElement.textContent = '';
      errorElement.classList.remove(validationConfig.ErrorClass);
      input.classList.remove(validationConfig.inputErrorClass);
    } else {
      errorElement.textContent = input.validationMessage;
      errorElement.classList.add(validationConfig.ErrorClass);
      input.classList.add(validationConfig.inputErrorClass)
    }
};

const toggleSubmitButton = (inputs, button, validationConfig) => {
  const isFormValid = inputs.every(input => input.validity.valid)
    if(isFormValid) {
      button.classList.remove(validationConfig.inactiveButtonClass);
      button.disabled = '';
    } else {
      button.classList.add(validationConfig.inactiveButtonClass);
      button.disabled = 'disabled';
    }
};

function disableSubmitButton (button) {
  button.classList.add(validationConfig.inactiveButtonClass);
  button.disabled = true;
}

enableValidation(validationConfig);