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
const cardData = [
    {
      name: '',
      link: ''
    }
];
const popupPhotoFullScreen = document.querySelector('.popup__photo');
const popupTextFullScreen = document.querySelector('.popup__photo-text');

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

const cardNameInput = document.querySelector('.popup__text_type_card-name');
const cardLinkInput = document.querySelector('.popup__text_type_card-link');

const formAddElement = document.querySelector('[name=popupAddForm]');

function closePopup(popupItem) {
    popupItem.classList.remove('popup-open');
}
function openPopup(popupItem) {
    popupItem.classList.add('popup-open');
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    titleInfo.textContent = nameInput.value;
    subtitleInfo.textContent = jobInput.value;
    closePopup(popupEditor);
};

function handleCardFormSubmit (evt) {
    evt.preventDefault();
    cardData.name = cardNameInput.value;
    cardData.link = cardLinkInput.value;
    if ((cardNameInput.value !== '') && (cardLinkInput.value !== '')) {
        addCard(cardData);
        closePopup(popupAddCard);
        formAddElement.reset();
    }
};

function addCard(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardElementPhoto = cardElement.querySelector('.elements__photo');
    cardElement.querySelector('.elements__title').textContent = cardData.name;
    cardElementPhoto.src = cardData.link;
    cardElementPhoto.alt = cardData.name;

    const buttonLike = cardElement.querySelector('.elements__like');
    buttonLike.addEventListener('click', () => {
            buttonLike.classList.toggle('elements__like_type_activ');
    });

    const cardToDelete = cardElement.querySelector('.elements__trash');
    cardToDelete.addEventListener('click', (evt) => {
            removeCard(cardToDelete);
    });

    cardElementPhoto.addEventListener('click', function (evt) {
            popupPhotoFullScreen.src = evt.target.src;
            popupPhotoFullScreen.alt = cardData.name;
            popupTextFullScreen.textContent = cardData.name;
            openPopup(popupPhoto);
    });

    cardsContainer.prepend(cardElement);
}

function removeCard(element){
    element.parentNode.remove();
} 

buttonEditProfile.addEventListener('click', function () {
    openPopup(popupEditor);
    nameInput.value = titleInfo.textContent;
    jobInput.value = subtitleInfo.textContent;
});

buttonAddProfile.addEventListener('click', function () {
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
    addCard(item);
});
