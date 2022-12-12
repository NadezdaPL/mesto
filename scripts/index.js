import initialCards from './cards.js'

const formEditProfile = document.forms.edit;
const formAddCard = document.forms.add;
const nameElement = formEditProfile.elements.name;
const jobElement = formEditProfile.elements.job;
const nicknameElement = formAddCard.elements.nickname;
const linkElement = formAddCard.elements.link;
const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit-button');
const profileAddButtonElement = profileElement.querySelector('.profile__add-button');
const profileTitle = profileElement.querySelector('.profile__title');
const profileText = profileElement.querySelector('.profile__text');
const popupEditProfile = document.querySelector('#popup__edit');
const popupCloseEditButtonElement = popupEditProfile.querySelector('.popup__close');
const cardsContainer = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#elements__cards').content.querySelector('.elements__container');
const popupAddCard = document.querySelector('#popup__add');
const popupCloseAddButtonElement = popupAddCard.querySelector('.popup__close');;
const popupImageElement = document.querySelector('.popup_image');
const popupImageCloseButton = popupImageElement.querySelector('.popup__close');
const popupImageItem = popupImageElement.querySelector('.popup__image-item');
const popupImageTitle = popupImageElement.querySelector('.popup__image-title');

const openPopup = function (popup) { 
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleKeyUp);
  popup.addEventListener('click', closePopupOverlay);
};

profileEditButtonElement.addEventListener('click', function () {
  formEditProfile.reset();
  nameElement.value = profileTitle.textContent; 
  jobElement.value = profileText.textContent;
  openPopup(popupEditProfile);
});

profileAddButtonElement.addEventListener('click', function () {
  openPopup(popupAddCard);
});

function formEditSubmitHandler (evt) { 
  evt.preventDefault();
  profileTitle.textContent = nameElement.value;
  profileText.textContent = jobElement.value;
  closePopup(popupEditProfile);
};

function createElement(item) {
  const card = cardsTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.elements__title');
  const cardLink = card.querySelector('.elements__item');
  const cardLinkAlt = card.querySelector('.elements__item');
  const cardLikeButton = card.querySelector('.elements__button-like');
  const cardDeleteButton = card.querySelector('.elements__button-delete');

  cardLikeButton.addEventListener('click', handleLikeButton);
  cardDeleteButton.addEventListener('click', handleDeleteButton);
  cardTitle.textContent = item.title;
  cardLink.src = item.link;
  cardLinkAlt.alt = item.title;
  
  cardLink.addEventListener('click', function () {
    popupImageItem.src = item.link;
    popupImageItem.alt = item.title;
    popupImageTitle.textContent = item.title;
    openPopup(popupImageElement);
  })
  return card;
};

const handleLikeButton = (e) => {
  e.target.classList.toggle('elements__button-like_active')
};

const handleDeleteButton = (e) => {
  e.target.closest('.elements__container').remove()
};

const renderCard = (item, wrapElement) => {
  const element = createElement(item);
  wrapElement.prepend(element);
};

initialCards.forEach(function(item) {
  renderCard(item, cardsContainer)
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
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

const closePopup = function (popup) { 
  popup.classList.remove('popup_opened')
  document.removeEventListener('keyup', handleKeyUp);
  popup.removeEventListener('click', closePopupOverlay);
};

profileEditButtonElement.addEventListener('click', openPopup);
profileAddButtonElement.addEventListener('click', openPopup);
popupCloseEditButtonElement.addEventListener('click', () => closePopup(popupEditProfile));
popupCloseAddButtonElement.addEventListener('click', () => closePopup(popupAddCard));
popupImageCloseButton.addEventListener('click', () => closePopup(popupImageElement));
formAddCard.addEventListener('submit', formAddSubmitHandler);
formEditProfile.addEventListener('submit', formEditSubmitHandler);