import {initialCards } from './Card.js'
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
const formProfile = document.querySelector('[name=popupEditorForm]');
const popupPhotoFullScreen = document.querySelector('.popup__photo');
const popupTextFullScreen = document.querySelector('.popup__photo-text');
const cardsContainer = document.querySelector('.elements');
const cardNameInput = document.querySelector('.popup__text_type_card-name');
const cardLinkInput = document.querySelector('.popup__text_type_card-link');
const formAddElement = document.querySelector('[name=popupAddForm]');
const closeButtons = document.querySelectorAll('.popup-close');


function handleProfileFormSubmit (){
    titleInfo.textContent = nameInput.value;
    subtitleInfo.textContent = jobInput.value;
    popupEditor.close();
};


buttonEditProfile.addEventListener('click', function () {
    popupEditor.open();
    nameInput.value = titleInfo.textContent;
    jobInput.value = subtitleInfo.textContent;
});

buttonAddProfile.addEventListener('click', function () {
    formAddElement.reset();
    openPopup(popupAddCard);
});



formAddElement.addEventListener('submit', handleCardFormSubmit);

  



/////////////////////////////////   Card
class Card {
    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
    }
  
    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .cloneNode(true);
  
        return cardElement;
    }

    _toggleLike(evt){ 
        evt.target.classList.toggle('elements__like_type_activ');
    }

    _handleImageClick(){ 
        popupPhoto.open(this._name, this._link);
    }

    _deleteCard(element){
        element.remove();
    }
  
    generateCard() {
        this._element = this._getTemplate();
        this._cardTitle = this._element.querySelector('.elements__title');
        this._cardImage = this._element.querySelector('.elements__photo');
        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__trash').addEventListener('click', (evt) => {
            const elementDelete = evt.target.closest('.elements__element');
            this._deleteCard(elementDelete);
        });
        this._element.querySelector('.elements__like').addEventListener('click', (evt) => {
            this._toggleLike(evt);
        });
        this._cardImage.addEventListener('click', () => {
            this._handleImageClick()
        });
    }
  
}




///////////////////////// Popup

class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup-close');
    };
    
    open() {
        this._popup.classList.add('popup-open');
        document.addEventListener('keydown', this._handleEscClose);
    };
    
    close() {
        this._popup.classList.remove('popup-open');
        document.removeEventListener('keydown', this._handleEscClose);
        
    };

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    };

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {            
            this.close();
        };
    }

    setEventListeners() {
        
        this._popup.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt);
        });
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
        this._popupCloseButton.addEventListener('click', () => {
            this.close();
        });
    };
};


////////////////////////////// PopupWithImage

class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._image = this._popup.querySelector('.popup__photo');
      this._text = this._popup.querySelector('.popup__photo-text');
    }
  
    open(name, link) {
      this._image.src = link;
      this._image.alt = name;
      this._text.textContent = name;
      super.open();
    }
  }

/////////////////////////////// PopupWithForm

class PopupWithForm extends Popup {
    constructor(popupSelector, handleCardFormSubmit) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
      this._inputList = Array.from(this._form.querySelectorAll('.popup__text'));
      this._handleCardFormSubmit = handleCardFormSubmit;
    }
  
    _getInputValues() {
      const inputValues = {};
      this._inputList.forEach((input) => {
        inputValues[input.name] = input.value;
      });
      return inputValues;
    };
  
    setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleCardFormSubmit(this._getInputValues());
      });
    };
  
    close() {
      super.close();
    }
  }



  //////////////////////// UserInfo

  class UserInfo {
    constructor({nameSelector, infoSelector}) {
      this._name = document.querySelector(nameSelector);
      this._info = document.querySelector(infoSelector);
    };
  
    getUserInfo() {
      return {
        name: this._name.textContent,
        info: this._info.textContent,
      };
    };

    setUserInfo({name, info}) {
      this._name.textContent = name;
      this._info.textContent = info;
    };
  };



/////////////////////////// Section
class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    };
    
    addItem(element) {
        this._containerSelector.prepend(element);
    };
    
    renderItem() {
        this._renderer(cardData);
    };

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    };
};
  /////////////////////
  
  


const createCard = new Section ({
    items: initialCards,
    renderer: (item) => {
        const card = new Card (item, '.card-template');
        const cardElement = card.generateCard();
        createCard.addItem(cardElement);
    }}, '.elements');

createCard.renderItems();

function handleCardFormSubmit (evt){
    evt.preventDefault();
    const cardData = {
          name: '',
          link: ''
    };
    cardData.name = cardNameInput.value;
    cardData.link = cardLinkInput.value;
    
    
    const card = new Card (cardData, '.card-template', handleCardClick);
        const cardElement = card.generateCard();
        createCard.addItem(cardElement);

    closePopup(popupAddCard);
    formAddElement.reset();
};




formList.forEach((formElement) => {
          
    const newForm = new FormValidator(config, formElement);
    newForm.enableValidation();
    newForm.setInitialState();
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        newForm.setInitialState();
    });
});


const popupEditor = new PopupWithForm('.popup_type_editor', handleProfileFormSubmit);
popupEditor.setEventListeners();

const popupPhoto = new PopupWithImage('.popup_type_photo');
popupPhoto.setEventListeners();


const popupAddCard = document.querySelector('.popup_type_add-card');