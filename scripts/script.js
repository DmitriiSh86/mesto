const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditor = document.querySelector('.popup_type_editor');
const popupAddcard = document.querySelector('.popup_type_addcard');
const popupPhoto = document.querySelector('.popup_type_photo');
const closeButton = document.querySelector('.popup-close');
const closeButtonAdd = document.querySelector('.popup-close_type_add');
const closeButtonPhoto = document.querySelector('.popup-close_type_photo');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const titleInfo = document.querySelector('.profile__title');
const subtitleInfo = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');


const cardList = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

const cardNameInput = document.querySelector('.popup__text_type_card-name');
const cardLinkInput = document.querySelector('.popup__text_type_card-link');

const formAddElement = document.querySelector('[name=popupAddForm]');

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

function closePopup(popupItem) {
    popupItem.classList.remove('popup-open');
}
function openPopup(popupItem) {
    popupItem.classList.add('popup-open');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    titleInfo.textContent = nameInput.value;
    subtitleInfo.textContent = jobInput.value;
    closePopup(popupEditor);
};

function addFormSubmit (evt) {
    evt.preventDefault();
    const newCardname = cardNameInput.value;
    const newLinkName = cardLinkInput.value;
    if ((cardNameInput.value !== '') && (cardLinkInput.value !== '')) {
    addCard(newCardname, newLinkName);
    closePopup(popupAddcard);
    cardNameInput.value = "";
    cardLinkInput.value = "";   
}};

function addCard(name, link){
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__title').textContent = name;
    cardElement.querySelector('.elements__photo').setAttribute("src", link);
    cardElement.querySelector('.elements__photo').setAttribute("alt", name)

    cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_type_activ');
    });

    cardElement.querySelector('.elements__trash').addEventListener('click', function (evt) {            
        cardDelete(evt.target);
        });

    cardElement.querySelector('.elements__photo').addEventListener('click', function (evt) {
            document.querySelector('.popup__photo').setAttribute("src", evt.target.src);
            document.querySelector('.popup__photo-text').textContent = name;
            openPopup(popupPhoto);
            });

    cardList.prepend(cardElement);
}

function cardDelete(element){
    element.parentNode.remove();
} 

editButton.addEventListener('click', function () {
    openPopup(popupEditor);
    nameInput.value = titleInfo.textContent;
    jobInput.value = subtitleInfo.textContent;
});

addButton.addEventListener('click', function () {
    openPopup(popupAddcard);
});

closeButton.addEventListener('click', function () {
    closePopup(popupEditor);
});
closeButtonAdd.addEventListener('click', function () {
    closePopup(popupAddcard);
    cardNameInput.value = "";
    cardLinkInput.value = "";
});

closeButtonPhoto.addEventListener('click', function () {
    closePopup(popupPhoto);
});

formElement.addEventListener('submit', handleFormSubmit);

formAddElement.addEventListener('submit', addFormSubmit);
 
initialCards.forEach(function (item) {
    addCard(item.name, item.link);
});
