import './index.css';
import {
  formEditProfile,
  formAddCard,
  nameElement,
  jobElement,
  //nicknameElement,
  //linkElement,
  //profileElement,
  profileEditButtonElement,
  profileAddButtonElement,
  //profileTitle,
  //profileText,
  //popupEditProfile,
  //popupCloseEditButtonElement,
  cardsContainer,
  //cardsTemplate,
  //popupAddCard,
  //popupCloseAddButtonElement,
  //popupImageElement,
  //popupImageCloseButton,
  //popupImageItem,
  //popupImageTitle,
  popupSaveButton,
  //templateSelector,
} from "../utils/constants.js";
import { initialCards } from "../utils/initialCards.js";
import { validationConfig } from "../utils/validationConfig.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const editFormValidation = new FormValidator(validationConfig, formEditProfile);
editFormValidation.enableValidation();

const addFormValidation = new FormValidator(validationConfig, formAddCard);
addFormValidation.enableValidation();

const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();

const handleCardClick = (title, link) => {
  popupWithImage.open(title, link);
};

const createElement = (item) => {
  const card = new Card(item, "#elements__cards", handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = createElement(item)
      cardList.addItem(newCard);
    },
  },
  cardsContainer
);

cardList.renderCards();

const formAddSubmitHandler = (e, item) => {
  e.preventDefault();
  const newCard = createElement(item)
  cardList.addItem(newCard);
};

const formEditSubmitHandler = (e, values) => {
  e.preventDefault();
  userInfo.setUserInfo(values.name, values.job);
};

const addCardPopupForm = new PopupWithForm("#popup__add", formAddSubmitHandler);
addCardPopupForm.setEventListeners();

const editCardPopupForm = new PopupWithForm(
  "#popup__edit",
  formEditSubmitHandler
);
editCardPopupForm.setEventListeners();

const userInfo = new UserInfo({
  userTitleSelector: ".profile__title",
  userTextSelector: ".profile__text",
});

profileEditButtonElement.addEventListener("click", () => {
  editCardPopupForm.open();
  const { title, text } = userInfo.getUserInfo();
  nameElement.value = title;
  jobElement.value = text;
});

profileAddButtonElement.addEventListener("click", () => {
  addCardPopupForm.open();
  formAddCard.reset();
  addFormValidation.toggleSubmitButton(popupSaveButton);
  addFormValidation.resetValidation();
});
