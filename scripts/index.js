const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit-button');
const profileAddButtonElement = profileElement.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__content');
const nameInput = formElement.querySelector('.popup__text_content_name');
const jobInput = formElement.querySelector('.popup__text_content_job');
const profileTitle = profileElement.querySelector('.profile__title');
const profileText = profileElement.querySelector('.profile__text');
const popupAdd = document.querySelector('#popup__add');
const popupCloseAddButtonElement = popupAdd.querySelector('.popup__close');

const openPopup = function (){ 
  popupElement.classList.add('popup_opened'); 
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileText.textContent; 
}

const openPopupAdd = function (){ 
  popupAdd.classList.add('popup_opened');
}

const closePopup = function (){ 
  popupElement.classList.remove('popup_opened');
  popupAdd.classList.remove('popup_opened');
} 

function formSubmitHandler (evt) { 
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup();
}

profileEditButtonElement.addEventListener('click', openPopup);
profileAddButtonElement.addEventListener('click', openPopupAdd);
popupCloseButtonElement.addEventListener('click', closePopup);
popupCloseAddButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

const initialCards = [
  {
    title: 'Россия',
    link: 'https://images.unsplash.com/photo-1669016585654-55d81d7cb8b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
  },
  {
    title: 'Южная Корея',
    link: 'https://images.unsplash.com/photo-1669090787997-1d7878a44be7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'
  },
  {
    title: 'Грузия',
    link: 'https://images.unsplash.com/photo-1668368047837-3d9c67145679?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
  },
  {
    title: 'Франция',
    link: 'https://images.unsplash.com/photo-1666535904953-35d65626d30d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'
  },
  {
    title: 'Исландия',
    link: 'https://images.unsplash.com/photo-1591662534117-b9d328dab8bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },
  {
    title: 'Турция',
    link: 'https://images.unsplash.com/photo-1669111959488-fb9508809efc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
];

const cardElement = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#elements__cards').content.querySelector('.elements__container');
const form = document.querySelector('#popup__content-add');
const formNicknameInput = document.querySelector('[name="popup__text_content_nickname"]');
const formLinkInput = document.querySelector('[name="popup__text_content_link"]');
const popupImageElement = document.querySelector('.popup__image');
const popupImageContainer = popupImageElement.querySelector('.popup__image-container');
const popupImageItem = popupImageElement.querySelector('.popup__image-item');
const popupImageTitle = popupImageElement.querySelector('.popup__image-title');

function createElement(item) {
  const cards = cardsTemplate.cloneNode(true);
  const cardsTitle = cards.querySelector('.elements__title');
  const cardsLink = cards.querySelector('.elements__item');
  const cardLikeButton = cards.querySelector('.elements__button-like');
  const cardDeleteButton = cards.querySelector('.elements__button-delete');

  cardLikeButton.addEventListener('click', handleLikeButton)
  cardDeleteButton.addEventListener('click', handleDeleteButton)
  cardsTitle.textContent = item.title;
  cardsLink.src = item.link;

  
  cards.addEventListener('click', function () {
    popupImageItem.src = item.link;
    popupImageTitle.textContent = item.title;
    openPopup(popupImageElement);
  })

  return cards;
}

const handleLikeButton = (e) => {
  e.target.classList.toggle('elements__button-like_active')
}

const handleDeleteButton = (e) => {
  e.target.closest('.elements__container').remove()
}

const renderCard = (item, wrapElement) => {
  const element = createElement(item)
  wrapElement.prepend(element);
}

initialCards.forEach(function(item) {
  renderCard(item, cardElement)
})

const handleFormSubmit = (e) => {
  e.preventDefault ()
  const image = {
    title: formNicknameInput.value,
    link: formLinkInput.value
  }
  renderCard(image, cardElement)
  closePopup();
}

form.addEventListener('submit', handleFormSubmit)



