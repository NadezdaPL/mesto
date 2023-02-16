import "./index.css";
import {
  nameElement,
  jobElement,
  profileEditButtonElement,
  profileAddButtonElement,
  cardsContainer,
  profileAvatarButtonElement,
} from "../utils/constants.js";
import { validationConfig } from "../utils/validationConfig.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "7b9e1f3e-ea14-4843-8c77-09b44113828b",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  infoSelector: ".profile__text",
  avatarSelector: ".profile__avatar",
});

const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createElement(item);
      cardList.addItem(cardElement);
    },
  },
  cardsContainer
);

const renderInitialCards = (cards) => {
  cardList.renderCards(cards);
};

Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([data, initialCards]) => {
    userInfo.setUserInfo(data);
    renderInitialCards(initialCards);
  })
  .catch((error) => {
    console.log(error);
  });
  
const handleCardDelete = async (card) => {
  console.log(card)
  const id = card.getCardId();
  try {
    await api.deleteCard(id);
    popupWithConfirmation.close();
    card.deleteCard();
  } catch (error) {
    console.log(error);
  }
};

const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();


const popupWithConfirmation = new PopupWithConfirmation(
  ".popup_confirm",
  handleCardDelete
);
popupWithConfirmation.setEventListeners();

const createElement = (item) => {
  const card = new Card(item, userInfo.getUserId(), "#elements__cards", {
    handleCardClick: (title, link) => {
      popupWithImage.open(title, link);
    },
    handleLikeClick: () => {
      const id = card.getCardId();
      const isLiked = card.defineLikes();
      console.log(isLiked);
      const resultApi = isLiked ? api.removeLike(id) : api.addLike(id);
      resultApi
        .then((initialCards) => {
          card.setLikes(initialCards);
          card.renderLikes();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDeleteClick: () => {
      popupWithConfirmation.open(card);
    },
  });
  return card.generateCard();
};

const addCardPopupForm = new PopupWithForm(
  {
    handleFormSubmit: async (card) => {
      try {
        const data = await api.createCard(card);
        const cardElement = createElement(data);
        cardList.prependItem(cardElement);
      } catch (error) {
        console.log(error);
      }
    },
  },
  "#popup__add");
addCardPopupForm.setEventListeners();

const editCardPopupForm = new PopupWithForm({
    handleFormSubmit: async (data) => {
      try {
        const newData = await api.addInfo(data)
        userInfo.setUserInfo(newData);
      } catch (error) {
        console.log(error);
      }
    },
  },
  "#popup__edit");

editCardPopupForm.setEventListeners();

const avatarCardPopupForm = new PopupWithForm(
  {
    handleFormSubmit: async (avatar) => {
      try {
        const data =  await api.addAvatar(avatar)
        userInfo.setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  "#popup__avatar");

avatarCardPopupForm.setEventListeners();

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

profileEditButtonElement.addEventListener("click", () => {
  editCardPopupForm.open();
  const { name, info } = userInfo.getUserInfo();
  nameElement.value = name;
  jobElement.value = info;
  formValidators['edit'].resetValidation();
});

profileAddButtonElement.addEventListener("click", () => {
  addCardPopupForm.open();
  formValidators['add'].toggleSubmitButton();
  formValidators['add'].resetValidation();
});

profileAvatarButtonElement.addEventListener("click", () => {
  avatarCardPopupForm.open();
  formValidators['avatar'].resetValidation();
});