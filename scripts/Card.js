export class Card {
  constructor(initialCards, templateSelector, handleCardClick) {
    this._title = initialCards.title;
    this._link = initialCards.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._element = this._getTemplate();
    const cardTitle = this._element.querySelector('.elements__title');
    const cardLink = this._element.querySelector('.elements__item');
    const cardLinkAlt = this._element.querySelector('.elements__item');
    const cardLikeButton = this._element.querySelector('.elements__button-like');
    const cardDeleteButton = this._element.querySelector('.elements__button-delete');
    
    cardTitle.textContent = this._title;
    cardLink.src = this._link;
    cardLinkAlt.alt = this._title;

    this._setEventListeners(cardLink, cardLikeButton, cardDeleteButton);
  
    return this._element;
  }

  _setEventListeners(cardLink, cardLikeButton, cardDeleteButton) {
    cardLink.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });

    cardLikeButton.addEventListener('click', () => {
      this._handleLikeButton(cardLikeButton);
    });

    cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteButton();
    })
  }

  _handleLikeButton (cardLikeButton) {
    cardLikeButton.classList.toggle('elements__button-like_active')
  }
  
  _handleDeleteButton () {
    this._element.remove()
  }

}
