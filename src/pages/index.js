
import '../pages/index.css';
import {formList, buttonEditProfile, buttonAddProfile, nameInput, jobInput} from '../utils/elements.js'
import {config, initialCards} from '../utils/constants.js'
import {Section} from '../components/Section.js'
import {Card} from '../components/Card.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js';

function setInfoForm({name, info}){
    nameInput.value = name;
    jobInput.value = info;
};

function renderCard(item){
    const card = new Card (item, '.card-template', handleCardClick);
        const cardElement = card.generateCard();
        cardsContainer.addItem(cardElement);
};

function handleCardClick(name, link) {
    popupPhoto.open(name, link);
};

const cardsContainer = new Section ({
    items: initialCards,
    renderer: (item) => {
        renderCard(item);
    }}, '.elements');

cardsContainer.renderItems();

function handleProfileFormSubmit (inputList){
    user.setUserInfo(inputList["form-editor-name"], inputList["form-editor-about"]);
};

const popupEditor = new PopupWithForm('.popup_type_editor', handleProfileFormSubmit);
popupEditor.setEventListeners();

function handleCardFormSubmit (inputList){
    const cardData = {
        name: inputList["form-card-name"],
        link: inputList["form-card-link"]
    };   
    
    renderCard(cardData);
};

const popupAddCard = new PopupWithForm('.popup_type_add-card', handleCardFormSubmit);
popupAddCard.setEventListeners();

const popupPhoto = new PopupWithImage('.popup_type_photo');
popupPhoto.setEventListeners();

const validators = {};
formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    validator.enableValidation(); 
    validator.setInitialState();
    validators[formElement.getAttribute('name')] = validator;
});

buttonAddProfile.addEventListener('click', function () {
    popupAddCard.open(); 
    validators['popupAddForm'].setInitialState();
});

buttonEditProfile.addEventListener('click', function () {
    popupEditor.open(); 
    validators['popupEditorForm'].setInitialState();
    setInfoForm(user.getUserInfo()) ;
});

const user = new UserInfo('.profile__title', '.profile__subtitle');



