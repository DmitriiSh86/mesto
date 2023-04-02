import { Card, initialCards } from './Card.js'
import { FormValidator } from './FormValidator.js';

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_type_inactiv',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_type_activ'
};

const formList = Array.from(document.querySelectorAll(config.formSelector));

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddProfile = document.querySelector('.profile__add-button');
const popupEditor = document.querySelector('.popup_type_editor');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupPhoto = document.querySelector('.popup_type_photo');
const buttonClosePopupEdit = document.querySelector('.popup-close_type_profile');
const buttonClosePopupAdd = document.querySelector('.popup-close_type_add');
const buttonClosePopupPhoto = document.querySelector('.popup-close_type_photo');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const titleInfo = document.querySelector('.profile__title');
const subtitleInfo = document.querySelector('.profile__subtitle');
const formProfile = document.querySelector('[name=popupEditorForm]');
const popupPhotoFullScreen = document.querySelector('.popup__photo');
const popupTextFullScreen = document.querySelector('.popup__photo-text');
const cardsContainer = document.querySelector('.elements');
const cardNameInput = document.querySelector('.popup__text_type_card-name');
const cardLinkInput = document.querySelector('.popup__text_type_card-link');
const formAddElement = document.querySelector('[name=popupAddForm]');

function closePopup(popupItem){    
    popupItem.classList.remove('popup-open');
    removeHandlerListenersPopup(popupItem);
};

function openPopup(popupItem){
    popupItem.classList.add('popup-open');
    setHandlerListenersPopup(popupItem);
};

function handleProfileFormSubmit (evt){
    evt.preventDefault();
    titleInfo.textContent = nameInput.value;
    subtitleInfo.textContent = jobInput.value;
    closePopup(popupEditor);
};

function handleCardFormSubmit (evt){
    evt.preventDefault();
    const cardData = {
          name: '',
          link: ''
    };
    cardData.name = cardNameInput.value;
    cardData.link = cardLinkInput.value;
    

    const card = new Card(cardData, '.card-template');
    const cardElement = card.generateCard();
  
    cardsContainer.prepend(cardElement);

    closePopup(popupAddCard);
    formAddElement.reset();
};

function handleCloseEsc(evt) {
    const popupOpenNow = document.querySelector('.popup-open');
    evt.key === 'Escape' && closePopup(popupOpenNow);
};

function handleCloseClick(evt) {
    const popupOpenNow = document.querySelector('.popup-open');
    evt.target.classList.contains('popup') && closePopup(popupOpenNow);
};

function removeHandlerListenersPopup(popupItem) {
    document.removeEventListener("keydown", handleCloseEsc);
    popupItem.removeEventListener("click", handleCloseClick);
};

function setHandlerListenersPopup(popupItem) {
    document.addEventListener("keydown", handleCloseEsc);
    popupItem.addEventListener("click", handleCloseClick);
};

buttonEditProfile.addEventListener('click', function () {
    openPopup(popupEditor);
    nameInput.value = titleInfo.textContent;
    jobInput.value = subtitleInfo.textContent;
});

buttonAddProfile.addEventListener('click', function () {
    formAddElement.reset();
    openPopup(popupAddCard);
});

buttonClosePopupEdit.addEventListener('click', function () {
    closePopup(popupEditor);
});

buttonClosePopupAdd.addEventListener('click', function () {
    closePopup(popupAddCard);
    formAddElement.reset();
});

buttonClosePopupPhoto.addEventListener('click', function () {
    closePopup(popupPhoto);
});

formProfile.addEventListener('submit', handleProfileFormSubmit);

formAddElement.addEventListener('submit', handleCardFormSubmit);
 
function removeCard(element){
    element.remove();
};
  
initialCards.forEach((item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card.generateCard();  
    cardsContainer.prepend(cardElement);
});

formList.forEach((formElement) => {
          
    const newForm = new FormValidator(config, formElement);
    newForm.enableValidation();
    newForm.setInitialState();
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        newForm.setInitialState();
    });
});

export { removeCard, popupPhotoFullScreen, popupTextFullScreen, openPopup, popupPhoto};