import initialCards from './cards.js'

const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit-button');
const profileAddButtonElement = profileElement.querySelector('.profile__add-button');
const profileTitle = profileElement.querySelector('.profile__title');
const profileText = profileElement.querySelector('.profile__text');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const formElement = document.querySelector('.popup__content');
const nameInput = formElement.querySelector('.popup__text_content_name');
const jobInput = formElement.querySelector('.popup__text_content_job');
const popupAdd = document.querySelector('#popup__add');
const popupCloseAddButtonElement = popupAdd.querySelector('.popup__close');
const cardElement = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#elements__cards').content.querySelector('.elements__container');
const form = document.querySelector('#popup__content-add');
const formNicknameInput = document.querySelector('[name="popup__text_content_nickname"]');
const formLinkInput = document.querySelector('[name="popup__text_content_link"]');
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
  openPopup(popupElement);
});

function formSubmitHandler (evt) { 
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup();
};

const openPopupAdd = function () {
  popupAdd.classList.add('popup_opened');
};

function createElement(item) {
  const cards = cardsTemplate.cloneNode(true);
  const cardsTitle = cards.querySelector('.elements__title');
  const cardsLink = cards.querySelector('.elements__item');
  const cardsLinkAlt = cards.querySelector('.elements__item');
  const cardLikeButton = cards.querySelector('.elements__button-like');
  const cardDeleteButton = cards.querySelector('.elements__button-delete');

  cardLikeButton.addEventListener('click', handleLikeButton);
  cardDeleteButton.addEventListener('click', handleDeleteButton);
  cardsTitle.textContent = item.title;
  cardsLink.src = item.link;
  cardsLinkAlt.alt = item.title;
  
  cardsLink.addEventListener('click', function () {
    popupImageItem.src = item.link;
    popupImageTitle.textContent = item.title;
    openPopup(popupImageElement);
  })
  return cards;
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
  renderCard(item, cardElement)
});

const handleFormSubmit = (e) => {
  e.preventDefault ()
  const image = {
    title: formNicknameInput.value,
    link: formLinkInput.value
  }
  renderCard(image, cardElement);
  closePopup();
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
form.addEventListener('submit', handleFormSubmit);
formElement.addEventListener('submit', formSubmitHandler);