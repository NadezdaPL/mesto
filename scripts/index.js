const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit-button');
console.log(profileEditButtonElement);

const openPopup = function (){
  popupElement.classList.add('popup_opened');
  console.log('Open popup clicked');
}

const closePopup = function (){
  popupElement.classList.remove('popup_opened');
}

let formElement = document.querySelector('.popup__content');
let nameInput = formElement.querySelector('.popup__text_content_name');
let jobInput = formElement.querySelector('.popup__text_content_job');
let profileTitle = document.querySelector('.profile__title');
let profileText = document.querySelector('.profile__text');

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileText.textContent = jobInput.value;

  closePopup();
}

profileEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 