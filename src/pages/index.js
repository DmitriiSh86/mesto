
import '../pages/index.css';
import {formList, buttonEditProfile, buttonAddProfile, nameInput, jobInput} from '../utils/elements.js'
import {config} from '../utils/constants.js'
import {Section} from '../components/Section.js'
import {Card} from '../components/Card.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js';

let cardsContainer = null;
let cardsArray = [];

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




function handleProfileFormSubmit (inputList){
    api.editUserProfile(inputList["form-editor-name"], inputList["form-editor-about"])
    .then((result) => {
      user.setUserInfo(result.name, result.about);
    })


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
    setInfoForm(user.getUserInfo());
});

const user = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');


//=================================================

class Api {
    constructor({baseUrl,headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
  
    getCards(){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

     
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    editUserProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({name: name, about: about}),
        })
        .then(res => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
      }
    
    


}
  
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
    headers: {
      authorization: '95eefe20-b22f-484c-84d4-8000a8496756',
      'Content-Type': 'application/json'
    }
  });


api.getUserInfo().then((data) => {
    user.setUserInfo(data.name, data.about);
    user.setAvatar(data.avatar);
});



api.getCards(cardsArray)
    .then((data) => {
    return data.map(({name, link}) => ({name, link}));
    })
    .then((cardArray) => { 
        cardsContainer = new Section ({
        items: cardArray,
        renderer: (item) => {
            renderCard(item);
        }}, '.elements');
    
        cardsContainer.renderItems();
    })



