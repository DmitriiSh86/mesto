
import '../pages/index.css';
import {formList, buttonEditProfile, buttonAddProfile, nameInput, jobInput, buttonEditAvatar} from '../utils/elements.js'
import {Api} from '../components/Api.js'
import {config} from '../utils/constants.js'
import {Section} from '../components/Section.js'
import {Card} from '../components/Card.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithConfirmation} from '../components/popupWithConfirmation.js'

import {UserInfo} from '../components/UserInfo.js'
import {FormValidator} from '../components/FormValidator.js';

let cardsContainer = null;
let userId = '';
function setInfoForm({name, info}){
    nameInput.value = name;
    jobInput.value = info;
};

function renderCard(item){
    const card = new Card (item, '.card-template', handleCardClick, userId, handleCardDelete);
        const cardElement = card.generateCard();
        cardsContainer.addItem(cardElement);
};

function handleCardClick(name, link) {
    popupPhoto.open(name, link);
};

function handleProfileFormSubmit (inputList, submitButton){
    submitButton.textContent = 'Сохранение...';
    api.editUserProfile(inputList["form-editor-name"], inputList["form-editor-about"])
    .then((result) => {
      user.setUserInfo(result.name, result.about);
      popupEditor.close();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
        submitButton.textContent = 'Сохранить';
    });
};

function handleEditAvatar (link, submitButton){
    submitButton.textContent = 'Сохранение...';
    api.changeAvatar(link["form-new-avatar"])
    .then((result) => {
      user.setAvatar(result.avatar)
      popupNewAvatar.close();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
        submitButton.textContent = 'Сохранить';
    });
};

function handleCardFormSubmit (inputList, submitButton){
    submitButton.textContent = 'Сохранение...';
    const cardData = {
        name: inputList["form-card-name"],
        link: inputList["form-card-link"]
    };
    api.addNewCard(cardData.name, cardData.link).then((result) => {
        renderCard(result);
        popupAddCard.close();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
        submitButton.textContent = 'Сохранить';
    });    
};

function handleCardDelete(cardId, cardElement) {
    popupDelete.open();
    popupDelete.setData(cardId, cardElement)
};

function handleDeleteFormSubmit (submitButton, idCard, cardContainer){
    submitButton.textContent = 'Удаление...';
    api.deleteCard(idCard)
    .then((info) => {
        cardContainer.remove();
        popupDelete.close();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
        submitButton.textContent = 'Да';        
    });
};

const popupDelete = new PopupWithConfirmation('.popup_type_delete', handleDeleteFormSubmit);
popupDelete.setEventListeners();

const popupEditor = new PopupWithForm('.popup_type_editor', handleProfileFormSubmit);
popupEditor.setEventListeners();

const popupNewAvatar = new PopupWithForm('.popup_type_edit-avatar', handleEditAvatar);
popupNewAvatar.setEventListeners();

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

buttonEditAvatar.addEventListener('click', function () {
    popupNewAvatar.open();
});

const user = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');
  
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
    headers: {
      authorization: '95eefe20-b22f-484c-84d4-8000a8496756',
      'Content-Type': 'application/json'
    }
});

Promise.all([api.getUserInfo(), api.getCards()])
.then((result)=>{
    const [userData, cardsData] = result;
    user.setUserInfo(userData.name, userData.about);
    user.setAvatar(userData.avatar);
    userId = userData._id;

    cardsContainer = new Section ({
        items: cardsData,
        renderer: (item) => {
            renderCard(item);
        }}, '.elements');
    
        cardsContainer.renderItems();
})
.catch(err => console.log(`Ошибка.....: ${err}`)) 

export {api, Api};

