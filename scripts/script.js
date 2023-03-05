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
    createCard(cardData);
    const newCard = createCard(cardData);
    cardsContainer.prepend(newCard);
    closePopup(popupAddCard);
    formAddElement.reset();
};

function createCard(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardElementPhoto = cardElement.querySelector('.elements__photo');
    cardElement.querySelector('.elements__title').textContent = cardData.name;
    cardElementPhoto.src = cardData.link;
    cardElementPhoto.alt = cardData.name;
    return cardElement;
};

function removeCard(element){
    element.remove();
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

cardsContainerButtons.addEventListener('click', function (evt) {
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
    resetErrors(popupEditor, validationParametrs);
});

buttonAddProfile.addEventListener('click', function () {
    resetErrors(popupAddCard, validationParametrs);
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
 
initialCards.forEach(function (item) {
    const newCard = createCard(item);
    cardsContainer.prepend(newCard);
});