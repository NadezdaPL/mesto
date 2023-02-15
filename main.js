/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto/./src/pages/index.css?");

/***/ }),

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Api\": () => (/* binding */ Api)\n/* harmony export */ });\nclass Api {\r\n  constructor(options) {\r\n    this._options = options;\r\n    this._baseUrl = this._options.baseUrl;\r\n    this._headers = this._options.headers;\r\n  }\r\n\r\n  _checkResponse(response) {\r\n    if (response.ok) {\r\n      return response.json();\r\n    }\r\n    return Promise.reject(response);\r\n  }\r\n\r\n  _request(url, options) {\r\n    return fetch(url, options).then(this._checkResponse)\r\n  }\r\n\r\n  getInfo() {\r\n    return this._request(`${this._baseUrl}/users/me`, {\r\n      headers: this._headers,\r\n    });\r\n  }\r\n\r\n  getInitialCards() {\r\n    return this._request(`${this._baseUrl}/cards`, {\r\n      headers: this._headers,\r\n    });\r\n  }\r\n\r\n  addInfo(data) {\r\n    return this._request(`${this._baseUrl}/users/me`, {\r\n      headers: this._headers,\r\n      method: \"PATCH\",\r\n      body: JSON.stringify({\r\n        name: data.name,\r\n        about: data.job,\r\n      }),\r\n    });\r\n  }\r\n\r\n  createCard(data) {\r\n    return this._request(`${this._baseUrl}/cards`, {\r\n      headers: this._headers,\r\n      method: \"POST\",\r\n      body: JSON.stringify({\r\n        name: data.title,\r\n        link: data.link,\r\n      }),\r\n    });\r\n  }\r\n\r\n  addLike(id) {\r\n    return this._request(`${this._baseUrl}/cards/${id}/likes`, {\r\n      headers: this._headers,\r\n      method: \"PUT\",\r\n    });\r\n  }\r\n\r\n  removeLike(id) {\r\n    return this._request(`${this._baseUrl}/cards/${id}/likes`, {\r\n      headers: this._headers,\r\n      method: \"DELETE\",\r\n    });\r\n  }\r\n\r\n  deleteCard(id) {\r\n    return this._request(`${this._baseUrl}/cards/${id}`, {\r\n      headers: this._headers,\r\n      method: \"DELETE\",\r\n    });\r\n  }\r\n\r\n  addAvatar(data) {\r\n    return this._request(`${this._baseUrl}/users/me/avatar`, {\r\n      headers: this._headers,\r\n      method: \"PATCH\",\r\n      body: JSON.stringify({\r\n        avatar: data.avatar,\r\n      }),\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://mesto/./src/components/Api.js?");

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Card\": () => (/* binding */ Card)\n/* harmony export */ });\nclass Card {\r\n  constructor(\r\n    item,\r\n    userId,\r\n    templateSelector,\r\n    {\r\n    handleCardClick,\r\n    handleLikeClick,\r\n    handleDeleteClick\r\n    }\r\n  ) {\r\n    this.initialCards = item;\r\n    this._name = this.initialCards.name;\r\n    this._link = this.initialCards.link;\r\n    this._templateSelector = templateSelector;\r\n    this._handleCardClick = handleCardClick;\r\n    this._userId = userId;\r\n    this._ownerId = item.owner._id;\r\n    this._cardId = this.initialCards._id;\r\n    this._cardOwnerId = this.initialCards.owner._id;\r\n    this._handleDeleteClick = handleDeleteClick;\r\n    this._likes = this.initialCards.likes;\r\n    this._handleLikeClick = handleLikeClick;\r\n    this._element = this._getTemplate();\r\n    this._cardTitle = this._element.querySelector(\".elements__title\");\r\n    this._image = this._element.querySelector(\".elements__item\");\r\n    this._cardLikeButton = this._element.querySelector(\".elements__button-like\");\r\n    this._cardDeleteButton = this._element.querySelector(\".elements__button-delete\");\r\n    this._cardLikeNumber = this._element.querySelector(\".element__number\");\r\n  }\r\n\r\n  _getTemplate() {\r\n    const cardElement = document\r\n      .querySelector(this._templateSelector)\r\n      .content.querySelector(\".elements__container\")\r\n      .cloneNode(true);\r\n\r\n    return cardElement;\r\n  }\r\n\r\n  generateCard() {\r\n    this._cardTitle.textContent = this._name;\r\n    this._image.src = this._link;\r\n    this._image.alt = this._name;\r\n\r\n    this._setEventListeners();\r\n    this.renderLikes();\r\n\r\n    if (this._ownerId !== this._userId) {\r\n      this._cardDeleteButton.remove();\r\n    }\r\n\r\n    return this._element;\r\n  }\r\n\r\n  renderLikes() {\r\n    this._cardLikeNumber.textContent = this._likes.length;\r\n    this.switchLikes();\r\n  }\r\n\r\n  defineLikes() {\r\n    return this._likes.some((like) => like._id === this._userId);\r\n  }\r\n\r\n  switchLikes() {\r\n    if (this.defineLikes()) {\r\n      this._cardLikeButton.classList.add(\"elements__button-like_active\");\r\n    } else {\r\n      this._cardLikeButton.classList.remove(\"elements__button-like_active\");\r\n    }\r\n  }\r\n\r\n  setLikes(initialCards) {\r\n    this._likes = initialCards.likes;\r\n    this._cardLikeNumber.textContent = this._likes.length;\r\n    this._handleLikeButton();\r\n  }\r\n\r\n  _handleLikeButton() {\r\n    this._cardLikeButton.classList.toggle(\"elements__button-like_active\");\r\n  }\r\n\r\n  _handleDeleteButton() {\r\n    if (this._cardOwnerId !== this._userId) {\r\n      this._cardDeleteButton.remove();\r\n    }\r\n  }\r\n\r\n  getCardId() {\r\n    return this._cardId;\r\n  }\r\n\r\n  deleteCard() {\r\n    this._element.remove();\r\n    this._element = null;\r\n  }\r\n\r\n  _setEventListeners() {\r\n    this._image.addEventListener(\"click\", () => {\r\n      this._handleCardClick(this._name, this._link);\r\n    });\r\n\r\n    this._cardLikeButton.addEventListener(\"click\", () => {\r\n      this._handleLikeClick();\r\n    });\r\n\r\n    this._cardDeleteButton.addEventListener(\"click\", () => {\r\n      this._handleDeleteClick();\r\n    });\r\n  }\r\n}\n\n//# sourceURL=webpack://mesto/./src/components/Card.js?");

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FormValidator\": () => (/* binding */ FormValidator)\n/* harmony export */ });\nclass FormValidator {\r\n  constructor(validationConfig, formElement) {\r\n    this._formElement = formElement;\r\n    this._inputSelector = validationConfig.inputSelector;\r\n    this._inactiveButtonClass = validationConfig.inactiveButtonClass;\r\n    this._inputErrorClass = validationConfig.inputErrorClass;\r\n    this._errorClass = validationConfig.errorClass;\r\n    this._submitButtonElement = this._formElement.querySelector(validationConfig.submitButtonSelector);\r\n    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));\r\n  }\r\n\r\n  _checkInputValidity = (input) => {\r\n    if(!input.checkValidity()) {\r\n      this._showError(input, input.validationMessage)\r\n    } else {\r\n      this._hideError(input)\r\n    }\r\n  }\r\n\r\n  _showError(input, errorMessage) {\r\n    const errorElement = this._formElement.querySelector(`#${input.id}-error`);\r\n    input.classList.add(this._inputErrorClass);\r\n    errorElement.textContent = errorMessage;\r\n    errorElement.classList.add(this._errorClass);\r\n  }\r\n\r\n  _hideError(input) {\r\n    const errorElement = this._formElement.querySelector(`#${input.id}-error`);\r\n    input.classList.remove(this._inputErrorClass);\r\n    errorElement.classList.remove(this._errorClass);\r\n    errorElement.textContent = '';\r\n  }\r\n\r\n  _isInputValid() {\r\n    return this._inputList.some((input) => {\r\n      return !input.validity.valid;\r\n    })\r\n  }\r\n\r\n  toggleSubmitButton = () => {\r\n    if(this._formElement.checkValidity()) {\r\n      this._submitButtonElement.disabled = false\r\n      this._submitButtonElement.classList.remove(this._inactiveButtonClass);\r\n    } else {\r\n      this._submitButtonElement.classList.add(this._inactiveButtonClass);\r\n      this._submitButtonElement.disabled = true\r\n    }\r\n  }\r\n\r\n  _setEventListener() {\r\n    this.toggleSubmitButton(this._submitButton)\r\n    this._inputList.forEach((input) => {\r\n      input.addEventListener('input', () => {\r\n        this._checkInputValidity(input);\r\n        this.toggleSubmitButton(this._submitButton);\r\n      })\r\n    })\r\n  }\r\n\r\n  resetValidation = () => {\r\n    this.toggleSubmitButton;\r\n    this._inputList.forEach((input) => {\r\n      this._hideError(input)\r\n    });\r\n\r\n  }\r\n\r\n  enableValidation = () => {\r\n    this._setEventListener()\r\n  }\r\n}\n\n//# sourceURL=webpack://mesto/./src/components/FormValidator.js?");

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Popup\": () => (/* binding */ Popup)\n/* harmony export */ });\nclass Popup {\r\n  constructor(popupSelector) {\r\n    this._popupElement = document.querySelector(popupSelector);\r\n    this._handleEscClose = this._handleEscClose.bind(this)\r\n  }\r\n\r\n  _handleEscClose = (e) => {\r\n    if (e.key === 'Escape') {\r\n      this.close()\r\n    }\r\n  }\r\n\r\n  open() {\r\n    this._popupElement.classList.add('popup_opened');\r\n    document.addEventListener('keyup', this._handleEscClose);\r\n  }\r\n\r\n  setInputValues(data) {\r\n    this._inputList.forEach((input) => {\r\n      input.value = data[input.name];\r\n    });\r\n  }\r\n\r\n  close() {\r\n    this._popupElement.classList.remove('popup_opened');\r\n    document.removeEventListener('keyup', this._handleEscClose);\r\n }\r\n\r\n  setEventListeners() {\r\n    this._popupElement.addEventListener('mousedown', (e) => {\r\n      if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {\r\n        this.close()\r\n      }\r\n    });\r\n  }\r\n}\n\n//# sourceURL=webpack://mesto/./src/components/Popup.js?");

/***/ }),

/***/ "./src/components/PopupWithConfirmation.js":
/*!*************************************************!*\
  !*** ./src/components/PopupWithConfirmation.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PopupWithConfirmation\": () => (/* binding */ PopupWithConfirmation)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\r\n\r\nclass PopupWithConfirmation extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup {\r\n  constructor(popupSelector, cardDeleteHandler) {\r\n    super(popupSelector);\r\n    this._cardDeleteHandler = cardDeleteHandler;\r\n    this._form = this._popupElement.querySelector(\".popup__form\");\r\n    this._button = this._form.querySelector(\".popup__button\");\r\n    this._buttonText = this._button.textContent;\r\n  }\r\n\r\n  open(cardItem) {\r\n    this._card = cardItem;\r\n    super.open();\r\n  }\r\n\r\n  setEventListeners() {\r\n    this._form.addEventListener(\"submit\", (e) => {\r\n      e.preventDefault();\r\n      const initialText = this._button.textContent;\r\n      this._button.textContent = 'Удаление...';\r\n      this._cardDeleteHandler(this._card)\r\n        .then(() => this.close())\r\n        .catch((error) => {\r\n          console.log(error)\r\n        })\r\n        .finally(() => {\r\n          this._button.textContent = initialText;\r\n        })\r\n    });\r\n    super.setEventListeners();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithConfirmation.js?");

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PopupWithForm\": () => (/* binding */ PopupWithForm)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\r\n\r\nclass PopupWithForm extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup {\r\n  constructor({handleFormSubmit}, popupSelector) {\r\n    super(popupSelector);\r\n    this._handleFormSubmit = handleFormSubmit;\r\n    this._form = this._popupElement.querySelector('.popup__form');\r\n    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'))\r\n    this._button = this._form.querySelector('.popup__button');\r\n    this._buttonText = this._button.textContent;\r\n  }\r\n\r\n  _getInputValues() {\r\n    const values = {}\r\n    \r\n    this._inputs.forEach(input => {\r\n      const name = input.name\r\n      const value = input.value\r\n\r\n      values[name] = value\r\n    })\r\n    return values\r\n  }\r\n\r\n  setEventListeners() {\r\n    super.setEventListeners();\r\n    this._form.addEventListener('submit', (e) => {\r\n      e.preventDefault();\r\n      const initialText = this._button.textContent;\r\n      this._button.textContent = 'Сохранение...';\r\n      this._handleFormSubmit(this._getInputValues())\r\n        .then(() => this.close())\r\n        .catch((error) => {\r\n          console.log(error)\r\n        })\r\n        .finally(() => {\r\n          this._button.textContent = initialText;\r\n        })\r\n    });\r\n  }\r\n  close() {\r\n    this._form.reset();\r\n    super.close()\r\n  }\r\n}\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithForm.js?");

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PopupWithImage\": () => (/* binding */ PopupWithImage)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\r\n\r\nclass PopupWithImage extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup {\r\n  constructor(popupSelector) {\r\n    super(popupSelector);\r\n    this._popupImageItem = this._popupElement.querySelector('.popup__image-item');\r\n    this._popupImageTitle = this._popupElement.querySelector('.popup__image-title');\r\n  }\r\n  \r\n  open(title, link) {\r\n    this._popupImageItem.src = link;\r\n    this._popupImageItem.alt = title;\r\n    this._popupImageTitle.textContent = title;\r\n    super.open()\r\n  }\r\n}\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithImage.js?");

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Section\": () => (/* binding */ Section)\n/* harmony export */ });\nclass Section {\r\n  constructor({ renderer }, container) {\r\n    this._renderer = renderer;\r\n    this._container = container;\r\n  }\r\n\r\n  prependItem(element) {\r\n    this._container.prepend(element);\r\n  }\r\n\r\n  addItem(element) {\r\n    this._container.append(element)\r\n  }\r\n\r\n  renderCards(cards) {\r\n    cards.forEach(this._renderer)\r\n  }\r\n}\n\n//# sourceURL=webpack://mesto/./src/components/Section.js?");

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UserInfo\": () => (/* binding */ UserInfo)\n/* harmony export */ });\nclass UserInfo {\r\n  constructor ({ nameSelector, infoSelector, avatarSelector }) {\r\n    this._name = document.querySelector(nameSelector)\r\n    this._info = document.querySelector(infoSelector)\r\n    this._avatar = document.querySelector(avatarSelector)\r\n    this._userId = null\r\n  }\r\n\r\n  getUserInfo() {\r\n    return { name: this._name.textContent, info: this._info.textContent, avatar: this._avatar.src }\r\n  }\r\n\r\n  setUserInfo(data) {\r\n    this._name.textContent = data.name;\r\n    this._info.textContent = data.about;\r\n    this._avatar.src = data.avatar;\r\n    this._userId = data._id\r\n  }\r\n\r\n  getUserId() {\r\n    return this._userId\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://mesto/./src/components/UserInfo.js?");

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants.js */ \"./src/utils/constants.js\");\n/* harmony import */ var _utils_validationConfig_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/validationConfig.js */ \"./src/utils/validationConfig.js\");\n/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Card.js */ \"./src/components/Card.js\");\n/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/FormValidator.js */ \"./src/components/FormValidator.js\");\n/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Section.js */ \"./src/components/Section.js\");\n/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithImage.js */ \"./src/components/PopupWithImage.js\");\n/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/PopupWithForm.js */ \"./src/components/PopupWithForm.js\");\n/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/UserInfo.js */ \"./src/components/UserInfo.js\");\n/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Api.js */ \"./src/components/Api.js\");\n/* harmony import */ var _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/PopupWithConfirmation.js */ \"./src/components/PopupWithConfirmation.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_9__.Api({\r\n  baseUrl: \"https://mesto.nomoreparties.co/v1/cohort-59\",\r\n  headers: {\r\n    authorization: \"7b9e1f3e-ea14-4843-8c77-09b44113828b\",\r\n    \"Content-Type\": \"application/json\",\r\n  },\r\n});\r\n\r\nconst userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_8__.UserInfo({\r\n  nameSelector: \".profile__title\",\r\n  infoSelector: \".profile__text\",\r\n  avatarSelector: \".profile__avatar\",\r\n});\r\n\r\nconst cardList = new _components_Section_js__WEBPACK_IMPORTED_MODULE_5__.Section(\r\n  {\r\n    renderer: (item) => {\r\n      const newCard = createElement(item);\r\n      const cardElement = newCard.generateCard();\r\n      cardList.addItem(cardElement);\r\n    },\r\n  },\r\n  _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.cardsContainer\r\n);\r\n\r\nconst renderInitialCards = (cards) => {\r\n  cardList.renderCards(cards);\r\n};\r\n\r\nPromise.all([api.getInfo(), api.getInitialCards()])\r\n  .then(([data, initialCards]) => {\r\n    userInfo.setUserInfo(data);\r\n    renderInitialCards(initialCards);\r\n  })\r\n  .catch((error) => {\r\n    console.log(error);\r\n  });\r\n  \r\nconst handleCardDelete = async (card) => {\r\n  console.log(card)\r\n  const id = card.getCardId();\r\n  try {\r\n    await api.deleteCard(id);\r\n    popupWithConfirmation.close();\r\n    card.deleteCard();\r\n  } catch (error) {\r\n    console.log(error);\r\n  }\r\n};\r\n\r\nconst popupWithImage = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__.PopupWithImage(\".popup_image\");\r\npopupWithImage.setEventListeners();\r\n\r\n\r\nconst popupWithConfirmation = new _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_10__.PopupWithConfirmation(\r\n  \".popup_confirm\",\r\n  handleCardDelete\r\n);\r\npopupWithConfirmation.setEventListeners();\r\n\r\nconst createElement = (item) => {\r\n  const card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_3__.Card(item, userInfo.getUserId(), \"#elements__cards\", {\r\n    handleCardClick: (title, link) => {\r\n      popupWithImage.open(title, link);\r\n    },\r\n    handleLikeClick: () => {\r\n      const id = card.getCardId();\r\n      const isLiked = card.defineLikes();\r\n      console.log(isLiked);\r\n      const resultApi = isLiked ? api.removeLike(id) : api.addLike(id);\r\n      resultApi\r\n        .then((initialCards) => {\r\n          card.setLikes(initialCards);\r\n          card.renderLikes();\r\n        })\r\n        .catch((error) => {\r\n          console.log(error);\r\n        });\r\n    },\r\n    handleDeleteClick: () => {\r\n      popupWithConfirmation.open(card);\r\n    },\r\n  });\r\n  return card;\r\n};\r\n\r\nconst addCardPopupForm = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__.PopupWithForm(\r\n  {\r\n    handleFormSubmit: async (card) => {\r\n      try {\r\n        const data = await api.createCard(card)\r\n        const newCard = createElement(data)\r\n        const cardElement = newCard.generateCard();\r\n        cardList.prependItem(cardElement);\r\n      } catch (error) {\r\n        console.log(error);\r\n      }\r\n    },\r\n  },\r\n  \"#popup__add\");\r\naddCardPopupForm.setEventListeners();\r\n\r\nconst editCardPopupForm = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__.PopupWithForm({\r\n    handleFormSubmit: async (data) => {\r\n      try {\r\n        const newData = await api.addInfo(data)\r\n        userInfo.setUserInfo(newData);\r\n      } catch (error) {\r\n        console.log(error);\r\n      }\r\n    },\r\n  },\r\n  \"#popup__edit\");\r\n\r\neditCardPopupForm.setEventListeners();\r\n\r\nconst avatarCardPopupForm = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__.PopupWithForm(\r\n  {\r\n    handleFormSubmit: async (avatar) => {\r\n      try {\r\n        const data =  await api.addAvatar(avatar)\r\n        userInfo.setUserInfo(data);\r\n      } catch (error) {\r\n        console.log(error);\r\n      }\r\n    },\r\n  },\r\n  \"#popup__avatar\");\r\n\r\navatarCardPopupForm.setEventListeners();\r\n\r\nconst formValidators = {}\r\n\r\nconst enableValidation = (config) => {\r\n  const formList = Array.from(document.querySelectorAll(config.formSelector))\r\n  formList.forEach((formElement) => {\r\n    const validator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_4__.FormValidator(_utils_validationConfig_js__WEBPACK_IMPORTED_MODULE_2__.validationConfig, formElement)\r\n    const formName = formElement.getAttribute('name')\r\n    formValidators[formName] = validator;\r\n    validator.enableValidation();\r\n  });\r\n};\r\n\r\nenableValidation(_utils_validationConfig_js__WEBPACK_IMPORTED_MODULE_2__.validationConfig);\r\n\r\n_utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.profileEditButtonElement.addEventListener(\"click\", () => {\r\n  editCardPopupForm.open();\r\n  const { name, info } = userInfo.getUserInfo();\r\n  _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.nameElement.value = name;\r\n  _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.jobElement.value = info;\r\n  formValidators['edit'].resetValidation();\r\n});\r\n\r\n_utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.profileAddButtonElement.addEventListener(\"click\", () => {\r\n  addCardPopupForm.open();\r\n  formValidators['add'].toggleSubmitButton();\r\n  formValidators['add'].resetValidation();\r\n});\r\n\r\n_utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.profileAvatarButtonElement.addEventListener(\"click\", () => {\r\n  avatarCardPopupForm.open();\r\n  formValidators['avatar'].resetValidation();\r\n});\n\n//# sourceURL=webpack://mesto/./src/pages/index.js?");

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cardsContainer\": () => (/* binding */ cardsContainer),\n/* harmony export */   \"cardsTemplate\": () => (/* binding */ cardsTemplate),\n/* harmony export */   \"formAddCard\": () => (/* binding */ formAddCard),\n/* harmony export */   \"formAvatarCard\": () => (/* binding */ formAvatarCard),\n/* harmony export */   \"formEditProfile\": () => (/* binding */ formEditProfile),\n/* harmony export */   \"jobElement\": () => (/* binding */ jobElement),\n/* harmony export */   \"linkElement\": () => (/* binding */ linkElement),\n/* harmony export */   \"nameElement\": () => (/* binding */ nameElement),\n/* harmony export */   \"nicknameElement\": () => (/* binding */ nicknameElement),\n/* harmony export */   \"popupAddCard\": () => (/* binding */ popupAddCard),\n/* harmony export */   \"popupAvatarCard\": () => (/* binding */ popupAvatarCard),\n/* harmony export */   \"popupCloseAddButtonElement\": () => (/* binding */ popupCloseAddButtonElement),\n/* harmony export */   \"popupCloseEditButtonElement\": () => (/* binding */ popupCloseEditButtonElement),\n/* harmony export */   \"popupEditProfile\": () => (/* binding */ popupEditProfile),\n/* harmony export */   \"popupImageCloseButton\": () => (/* binding */ popupImageCloseButton),\n/* harmony export */   \"popupImageElement\": () => (/* binding */ popupImageElement),\n/* harmony export */   \"popupImageItem\": () => (/* binding */ popupImageItem),\n/* harmony export */   \"popupImageTitle\": () => (/* binding */ popupImageTitle),\n/* harmony export */   \"popupSaveButton\": () => (/* binding */ popupSaveButton),\n/* harmony export */   \"profileAddButtonElement\": () => (/* binding */ profileAddButtonElement),\n/* harmony export */   \"profileAvatarButtonElement\": () => (/* binding */ profileAvatarButtonElement),\n/* harmony export */   \"profileEditButtonElement\": () => (/* binding */ profileEditButtonElement),\n/* harmony export */   \"profileElement\": () => (/* binding */ profileElement),\n/* harmony export */   \"profileText\": () => (/* binding */ profileText),\n/* harmony export */   \"profileTitle\": () => (/* binding */ profileTitle),\n/* harmony export */   \"templateSelector\": () => (/* binding */ templateSelector)\n/* harmony export */ });\nconst formEditProfile = document.forms.edit;\r\nconst formAddCard = document.forms.add;\r\nconst formAvatarCard = document.forms.avatar;\r\nconst nameElement = formEditProfile.elements.name;\r\nconst jobElement = formEditProfile.elements.job;\r\nconst nicknameElement = formAddCard.elements.nickname;\r\nconst linkElement = formAddCard.elements.link;\r\nconst profileElement = document.querySelector('.profile');\r\nconst profileEditButtonElement = profileElement.querySelector('.profile__edit-button');\r\nconst profileAddButtonElement = profileElement.querySelector('.profile__add-button');\r\nconst profileAvatarButtonElement = profileElement.querySelector('.profile__edit-avatar');\r\nconst profileTitle = profileElement.querySelector('.profile__title');\r\nconst profileText = profileElement.querySelector('.profile__text');\r\nconst popupEditProfile = document.querySelector('#popup__edit');\r\nconst popupCloseEditButtonElement = popupEditProfile.querySelector('.popup__close');\r\nconst cardsContainer = document.querySelector('.elements');\r\nconst templateSelector = document.querySelector('#elements__cards')\r\nconst cardsTemplate = document.querySelector('#elements__cards').content.querySelector('.elements__container');\r\nconst popupAddCard = document.querySelector('#popup__add');\r\nconst popupCloseAddButtonElement = popupAddCard.querySelector('.popup__close');\r\nconst popupImageElement = document.querySelector('.popup_image');\r\nconst popupImageCloseButton = popupImageElement.querySelector('.popup__close');\r\nconst popupImageItem = popupImageElement.querySelector('.popup__image-item');\r\nconst popupImageTitle = popupImageElement.querySelector('.popup__image-title');\r\nconst popupSaveButton = popupAddCard.querySelector('.popup__button');\r\nconst popupAvatarCard = document.querySelector('.popup_avatar');\r\n\n\n//# sourceURL=webpack://mesto/./src/utils/constants.js?");

/***/ }),

/***/ "./src/utils/validationConfig.js":
/*!***************************************!*\
  !*** ./src/utils/validationConfig.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"validationConfig\": () => (/* binding */ validationConfig)\n/* harmony export */ });\nconst validationConfig = {\r\n  formSelector: '.popup__form',\r\n  inputSelector: '.popup__input',\r\n  submitButtonSelector: '.popup__button',\r\n  inactiveButtonClass: 'popup__button_disabled',\r\n  inputErrorClass: 'popup__input_type_error',\r\n  errorClass: 'popup__error_visible',\r\n}\n\n//# sourceURL=webpack://mesto/./src/utils/validationConfig.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/index.js");
/******/ 	
/******/ })()
;