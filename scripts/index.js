import {Section} from './Section.js'
import {Card} from './Card.js'
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

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const formList = Array.from(document.querySelectorAll(config.formSelector));
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddProfile = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
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
    user.setUserInfo(inputList["form-editor-name"], inputList["form-editor-about"]);
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
        setInfoForm(user.getUserInfo())        
        popupEditor.open();
    });
});

function setInfoForm({name, info}){
    nameInput.value = name;
    jobInput.value = info;
}

const user = new UserInfo('.profile__title', '.profile__subtitle');



