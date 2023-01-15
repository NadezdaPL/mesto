export class Card {
  constructor(initialCards, templateSelector, handleCardClick) {
    this._title = initialCards.title;
    this._link = initialCards.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector('.elements__title');
    this._cardLink = this._element.querySelector('.elements__item');
    this._cardLinkAlt = this._element.querySelector('.elements__item');
    this._cardLikeButton = this._element.querySelector('.elements__button-like');
    this._cardDeleteButton = this._element.querySelector('.elements__button-delete');
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__container')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._cardTitle.textContent = this._title;
    this._cardLink.src = this._link;
    this._cardLinkAlt.alt = this._title;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._cardLink.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });

    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteButton();
    })
  } 

  _handleLikeButton () {
    this._cardLikeButton.classList.toggle('elements__button-like_active')
  }

  _handleDeleteButton () {
    this._element.remove()
    this._element = null
  }
} 