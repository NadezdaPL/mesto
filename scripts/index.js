import initialCards from './cards.js'

const formEdit = document.forms.edit;
const formAdd = document.forms.add;
const nameElement = formEdit.elements.name;
const jobElement = formEdit.elements.job;
const nicknameElement = formAdd.elements.nickname;
const linkElement = formAdd.elements.link;
const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit-button');
const profileAddButtonElement = profileElement.querySelector('.profile__add-button');
const profileTitle = profileElement.querySelector('.profile__title');
const profileText = profileElement.querySelector('.profile__text');
const popup = document.querySelector('.popup')
const popupEdit = document.querySelector('#popup__edit');
const popupCloseEditButtonElement = popupEdit.querySelector('.popup__close');
const cardsContainer = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#elements__cards').content.querySelector('.elements__container');
const popupAdd = document.querySelector('#popup__add');
const popupCloseAddButtonElement = popupAdd.querySelector('.popup__close');
const popupSaveButton = popupAdd.querySelector('.popup__button');
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
  nameElement.value = profileTitle.textContent; 
  jobElement.value = profileText.textContent;
  openPopup(popupEdit);
});

profileAddButtonElement.addEventListener('click', function () {
  openPopup(popupAdd);
  popupSaveButton.disabled = 'disabled';
});

function formEditSubmitHandler (evt) { 
  evt.preventDefault();
  profileTitle.textContent = nameElement.value;
  profileText.textContent = jobElement.value;
  closePopup(popupEdit);
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
  closePopup(popupAdd);
};

popup.addEventListener('click', (e) => {
  if(!e.target.closest('.popup__container')) {
    closePopup(e.target.closest('.popup'))
  }
});

const handleKeyUp = (e) => {
  if(e.key === 'Escape') {
    const openPopups = document.querySelector('.popup_opened')
    closePopup(openPopups)
  }
};

const closePopupOverlay = (e) => {
  if (e.target === e.currentTarget) {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
};

const closePopup = function (popup) { 
  popup.classList.remove('popup_opened')
  document.removeEventListener('keyup', handleKeyUp);
  popup.removeEventListener('click', closePopupOverlay);
};

profileEditButtonElement.addEventListener('click', openPopup);
profileAddButtonElement.addEventListener('click', openPopup);
popupCloseEditButtonElement.addEventListener('click', () => closePopup(popupEdit));
popupCloseAddButtonElement.addEventListener('click', () => closePopup(popupAdd));
popupImageCloseButton.addEventListener('click', () => closePopup(popupImageElement));
formAdd.addEventListener('submit', formAddSubmitHandler);
formEdit.addEventListener('submit', formEditSubmitHandler);