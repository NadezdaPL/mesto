import { formEditProfile, formAddCard, nameElement, jobElement, nicknameElement, 
  linkElement, profileElement, profileEditButtonElement, profileAddButtonElement, 
  profileTitle, profileText, popupEditProfile, popupCloseEditButtonElement, 
  cardsContainer, cardsTemplate, popupAddCard, popupCloseAddButtonElement, 
  popupImageElement, popupImageCloseButton, popupImageItem, popupImageTitle, 
  popupSaveButton } from './constants.js'
import { initialCards } from './initialCards.js'
import { validationConfig } from './validationConfig.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const editFormValidation = new FormValidator(validationConfig, formEditProfile);
editFormValidation.enableValidation();

const addFormValidation = new FormValidator(validationConfig, formAddCard);
addFormValidation.enableValidation();

const openPopup = function (popup) { 
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleKeyUp);
  popup.addEventListener('click', closePopupOverlay);
};

profileEditButtonElement.addEventListener('click', function () {
  nameElement.value = profileTitle.textContent; 
  jobElement.value = profileText.textContent;
  openPopup(popupEditProfile);
});

profileAddButtonElement.addEventListener('click', function () {
  openPopup(popupAddCard);
  formAddCard.reset();
  addFormValidation.toggleSubmitButton(popupSaveButton)
});

function formEditSubmitHandler (evt) { 
  evt.preventDefault();
  profileTitle.textContent = nameElement.value;
  profileText.textContent = jobElement.value;
  closePopup(popupEditProfile);
};

const createElement = (item) => {
  const card = new Card (item, '#elements__cards', handleCardClick);
  const cardElement = card.generateCard();
  
  return cardElement
};

const handleCardClick = (cardTitle, cardLink) => {
  popupImageItem.src = cardLink;
  popupImageItem.alt = cardTitle;
  popupImageTitle.textContent = cardTitle;
  openPopup(popupImageElement);
};

const renderCard = (item, wrapElement) => {
  const element = createElement(item);
  wrapElement.prepend(element);
};

initialCards.forEach(function(item) {
  renderCard(item, cardsContainer, handleCardClick)
});

const formAddSubmitHandler = (e) => {
  e.preventDefault ()
  const image = {
    title: nicknameElement.value,
    link: linkElement.value
  }

  renderCard(image, cardsContainer);
  closePopup(popupAddCard);
};

const handleKeyUp = (e) => {
  if(e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
  }
};

const closePopupOverlay = (e) => {
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget);
  }
};

const closePopup = function (popup) { 
  popup.classList.remove('popup_opened')
  document.removeEventListener('keyup', handleKeyUp);
  popup.removeEventListener('click', closePopupOverlay);
};

popupCloseEditButtonElement.addEventListener('click', () => closePopup(popupEditProfile));
popupCloseAddButtonElement.addEventListener('click', () => closePopup(popupAddCard));
popupImageCloseButton.addEventListener('click', () => closePopup(popupImageElement));
formAddCard.addEventListener('submit', formAddSubmitHandler);
formEditProfile.addEventListener('submit', formEditSubmitHandler);