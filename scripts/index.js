import initialCards from './cards.js'

const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit-button');
const profileAddButtonElement = profileElement.querySelector('.profile__add-button');
const profileTitle = profileElement.querySelector('.profile__title');
const profileText = profileElement.querySelector('.profile__text');
const popupElement = document.querySelector('.popup');
const popupEdit = document.querySelector('#popup__edit');
const popupCloseButtonElement = popupEdit.querySelector('.popup__close');
const formContentEdit = popupEdit.querySelector('#popup__content-edit');
const nameInput = formContentEdit.querySelector('.popup__text_content_name');
const jobInput = formContentEdit.querySelector('.popup__text_content_job');
const cardsContainer = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#elements__cards').content.querySelector('.elements__container');
const popupAdd = document.querySelector('#popup__add');
const popupCloseAddButtonElement = popupAdd.querySelector('.popup__close');
const formContentAdd = popupAdd.querySelector('#popup__content-add');
const formNicknameInput = formContentAdd.querySelector('[name="popup__text_content_nickname"]');
const formLinkInput = formContentAdd.querySelector('[name="popup__text_content_link"]');
const popupImageElement = document.querySelector('.popup_image');
const popupImageCloseButton = popupImageElement.querySelector('.popup__close');
const popupImageItem = popupImageElement.querySelector('.popup__image-item');
const popupImageTitle = popupImageElement.querySelector('.popup__image-title');

const openPopup = function (popupElement) { 
  popupElement.classList.add('popup_opened')
};

profileEditButtonElement.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileText.textContent;
  openPopup(popupEdit);
});

function formEditSubmitHandler (evt) { 
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(popupEdit);
};

const openPopupAdd = function () {
  popupAdd.classList.add('popup_opened');
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
    title: formNicknameInput.value,
    link: formLinkInput.value
  }
  renderCard(image, cardsContainer);
  closePopup(popupImageElement);
};

const closePopup = function () {  
  popupElement.classList.remove('popup_opened'); 
  popupAdd.classList.remove('popup_opened'); 
  popupImageElement.classList.remove('popup_opened'); 
}; 

profileEditButtonElement.addEventListener('click', openPopup);
profileAddButtonElement.addEventListener('click', openPopupAdd);
popupCloseButtonElement.addEventListener('click', closePopup);
popupCloseAddButtonElement.addEventListener('click', closePopup);
popupImageCloseButton.addEventListener('click', closePopup);
formContentAdd.addEventListener('submit', formAddSubmitHandler);
formContentEdit.addEventListener('submit', formEditSubmitHandler);


