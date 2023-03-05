const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_type_inactiv',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_type_activ'
  }; 


const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;    
    errorElement.classList.add('popup__input-error_type_activ');
};
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_type_activ');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
        });
  });
};

function enableValidation(){
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });  
};

function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }); 
};

function resetErrors(inputData){
    const formElement = inputData.querySelector('.popup__form');
    const inputElements = inputData.querySelectorAll('.popup__text');
    inputElements.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });
};

function toggleButtonState(inputList, buttonElement){
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button_type_inactiv');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('popup__button_type_inactiv');
        buttonElement.disabled = false;
    } 
};

enableValidation();




!!!!!!!!!!!!!!!!!!!!!!!!



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
const buttonListener = document.querySelector('.elements');
let popupOpenCheck = false;

function closePopup(){
    let popupOpenNow = document.querySelector('.popup-open');
    popupOpenNow.classList.remove('popup-open');
    popupOpenCheck = false;
    resetErrors(popupOpenNow);
    const formElement = popupOpenNow.querySelector('.popup__form').name;
    if (formElement === "popupAddForm"){
        formAddElement.reset();
    }
};

function findOpenPopup(){
    const popupOpenNow = document.querySelector('.popup-open');
    return popupOpenNow;
}

function openPopup(popupItem){
    popupItem.classList.add('popup-open');
    popupOpenCheck = true;
};

function handleProfileFormSubmit (evt){
    evt.preventDefault();
    titleInfo.textContent = nameInput.value;
    subtitleInfo.textContent = jobInput.value;
    closePopup();
};

function handleCardFormSubmit (evt){
    evt.preventDefault();
    const cardData = {
          name: '',
          link: ''
    };
    cardData.name = cardNameInput.value;
    cardData.link = cardLinkInput.value;
    createCard(cardData);
    const newCard = createCard(cardData);
    cardsContainer.prepend(newCard);
    closePopup();
    formAddElement.reset();
};

function createCard(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardElementPhoto = cardElement.querySelector('.elements__photo');
    cardElement.querySelector('.elements__title').textContent = cardData.name;
    cardElementPhoto.src = cardData.link;
    cardElementPhoto.alt = cardData.name;
    return cardElement;
}

function removeCard(element){
    element.remove();
}

document.addEventListener('keydown', function (evt) {
    if ((evt.key === 'Escape')&&(popupOpenCheck === true)) {
        closePopup();
    }
});

document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup();
    }
});

buttonListener.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('elements__like')) {
        evt.target.classList.toggle('elements__like_type_activ');
    }
    if (evt.target.classList.contains('elements__trash')) {
        const elementDelete = evt.target.closest('.elements__element');
        removeCard(elementDelete);
    }
    if (evt.target.classList.contains('elements__photo')) {
        popupPhotoFullScreen.src = evt.target.src;
        popupPhotoFullScreen.alt = evt.target.alt;
        popupTextFullScreen.textContent = evt.target.alt;
        openPopup(popupPhoto);
    }
});

buttonEditProfile.addEventListener('click', function () {
    openPopup(popupEditor);
    nameInput.value = titleInfo.textContent;
    jobInput.value = subtitleInfo.textContent;
});

buttonAddProfile.addEventListener('click', function () {
    openPopup(popupAddCard);
});

buttonClosePopupEdit.addEventListener('click', function () {
    closePopup();
});

buttonClosePopupAdd.addEventListener('click', function () {
    closePopup();
});

buttonClosePopupPhoto.addEventListener('click', function () {
    closePopup();
});

formProfile.addEventListener('submit', handleProfileFormSubmit);

formAddElement.addEventListener('submit', handleCardFormSubmit);
 
initialCards.forEach(function (item) {
    const newCard = createCard(item);
    cardsContainer.prepend(newCard);
});