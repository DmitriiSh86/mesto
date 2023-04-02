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
const cardTemplate = document.querySelector('.card-template').content;
const cardNameInput = document.querySelector('.popup__text_type_card-name');
const cardLinkInput = document.querySelector('.popup__text_type_card-link');
const formAddElement = document.querySelector('[name=popupAddForm]');
const cardsContainerButtons = document.querySelector('.elements');

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
    resetErrors(popupEditor, validationParametrs);
});

buttonAddProfile.addEventListener('click', function () {
    resetErrors(popupAddCard, validationParametrs);
    formAddElement.reset();
    openPopup(popupAddCard);    
    setDefaultSubmitButton (popupAddCard, validationParametrs);
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

/////////




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
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.elements__title').textContent = this._name;
      this._element.querySelector('.elements__photo').src = this._link;
      this._element.querySelector('.elements__photo').alt = this._name;
      return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__trash').addEventListener('click', (evt) => {
            const elementDelete = evt.target.closest('.elements__element');
            removeCard(elementDelete);
        });
        this._element.querySelector('.elements__like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('elements__like_type_activ');
        });
        this._element.querySelector('.elements__photo').addEventListener('click', (evt) => {
            popupPhotoFullScreen.src = evt.target.src;
            popupPhotoFullScreen.alt = evt.target.alt;
            popupTextFullScreen.textContent = evt.target.alt;
            openPopup(popupPhoto);
        });
    }
  
  }
  
  initialCards.forEach((item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card.generateCard();
  
    cardsContainer.prepend(cardElement);
  });