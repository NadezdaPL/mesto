export class Card {
  constructor(
    item,
    userId,
    templateSelector,
    {
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
    }
  ) {
    this.initialCards = item;
    this._name = this.initialCards.name;
    this._link = this.initialCards.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._ownerId = item.owner._id;
    this._cardId = this.initialCards._id;
    this._cardOwnerId = this.initialCards.owner._id;
    this._handleDeleteClick = handleDeleteClick;
    this._likes = this.initialCards.likes;
    this._handleLikeClick = handleLikeClick;
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector(".elements__title");
    this._image = this._element.querySelector(".elements__item");
    this._cardLikeButton = this._element.querySelector(".elements__button-like");
    this._cardDeleteButton = this._element.querySelector(".elements__button-delete");
    this._cardLikeNumber = this._element.querySelector(".element__number");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__container")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._cardTitle.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    this._setEventListeners();
    this.renderLikes();

    if (this._ownerId !== this._userId) {
      this._cardDeleteButton.remove();
    }

    return this._element;
  }

  renderLikes() {
    this._cardLikeNumber.textContent = this._likes.length;
    this.switchLikes();
  }

  defineLikes() {
    return this._likes.some((like) => like._id === this._userId);
  }

  switchLikes() {
    if (this.defineLikes()) {
      this._cardLikeButton.classList.add("elements__button-like_active");
    } else {
      this._cardLikeButton.classList.remove("elements__button-like_active");
    }
  }

  setLikes(initialCards) {
    this._likes = initialCards.likes;
    this._cardLikeNumber.textContent = this._likes.length;
    this._cardLikeButton.classList.toggle("elements__button-like_active");
  }

  _handleLikeButton() {
    this._cardLikeButton.classList.toggle("elements__button-like_active");
  }

  _handleDeleteButton() {
    if (this._cardOwnerId !== this._userId) {
      this._cardDeleteButton.remove();
    }
  }

  getCardId() {
    return this._cardId;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });
  }
}