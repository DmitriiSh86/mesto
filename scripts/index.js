import {Section} from './Section.js'
import {initialCards, Card} from './Card.js'
import {PopupWithImage} from './PopupWithImage.js'
import {PopupWithForm} from './PopupWithForm.js'
import {UserInfo} from './UserInfo.js'
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
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const titleInfo = document.querySelector('.profile__title');
const subtitleInfo = document.querySelector('.profile__subtitle');
const formAddElement = document.querySelector('[name=popupAddForm]');

function handleCardClick(name, link) {
    popupPhoto.open(name, link);
};

const createCard = new Section ({
    items: initialCards,
    renderer: (item) => {
        const card = new Card (item, '.card-template', handleCardClick);
        const cardElement = card.generateCard();
        createCard.addItem(cardElement);
    }}, '.elements');

createCard.renderItems();


function handleProfileFormSubmit (inputList){
    titleInfo.textContent = inputList["form-editor-name"];
    subtitleInfo.textContent = inputList["form-editor-about"];
    popupEditor.close();
};

const popupEditor = new PopupWithForm('.popup_type_editor', handleProfileFormSubmit);
popupEditor.setEventListeners();


function handleCardFormSubmit (inputList){
    const cardData = {
          name: '',
          link: ''
    };
    cardData.name = inputList["form-card-name"];
    cardData.link = inputList["form-card-link"];    
    
    const card = new Card (cardData, '.card-template', handleCardClick);
    const cardElement = card.generateCard();
    createCard.addItem(cardElement);
    popupAddCard.close();
};

const popupAddCard = new PopupWithForm('.popup_type_add-card', handleCardFormSubmit);
popupAddCard.setEventListeners();

const popupPhoto = new PopupWithImage('.popup_type_photo');
popupPhoto.setEventListeners();







formList.forEach((formElement) => {
          
    const newForm = new FormValidator(config, formElement);
    newForm.enableValidation();
    newForm.setInitialState();
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        newForm.setInitialState();
    });
    buttonAddProfile.addEventListener('click', function () {
        formAddElement.reset();
        popupAddCard.open();
        newForm.setInitialState();
    });
    buttonEditProfile.addEventListener('click', function () {
        newForm.setInitialState();
        popupEditor.open();
        nameInput.value = titleInfo.textContent;
        jobInput.value = subtitleInfo.textContent;
    });
});


const user = new UserInfo('.profile__title', '.profile__subtitle');



