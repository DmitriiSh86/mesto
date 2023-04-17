import {config, initialCards, formList, buttonEditProfile, buttonAddProfile, nameInput, jobInput, formAddElement} from './constants.js'
import {Section} from './Section.js'
import {Card} from './Card.js'
import {PopupWithImage} from './PopupWithImage.js'
import {PopupWithForm} from './PopupWithForm.js'
import {UserInfo} from './UserInfo.js'
import { FormValidator } from './FormValidator.js';

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



