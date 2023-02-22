let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let popupEditor = document.querySelector('.popup_type_editor');
let popupAddcard = document.querySelector('.popup_type_addcard');
let closeButton = document.querySelector('.popup-close');
let closeButtonAdd = document.querySelector('.popup-close_type_add');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_job');
let titleInfo = document.querySelector('.profile__title');
let subtitleInfo = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');

function closePopup(popupItem) {
    popupItem.classList.remove('popup-open');
}
function openPopup(popupItem) {
    popupItem.classList.add('popup-open');
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
});


function handleFormSubmit (evt) {
    evt.preventDefault();
    titleInfo.textContent = nameInput.value;
    subtitleInfo.textContent = jobInput.value;
    closePopup(popupEditor);
};

formElement.addEventListener('submit', handleFormSubmit);


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

const cardList = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

let cardNameInput = document.querySelector('.popup__text_type_card-name');
let cardLinkInput = document.querySelector('.popup__text_type_card-link');

let formAddElement = document.querySelector('[name=popupAddForm]');

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

formAddElement.addEventListener('submit', addFormSubmit);

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

        cardList.prepend(cardElement);
}

function cardDelete(element){
        element.parentNode.remove();
}    
  
initialCards.forEach(function (item) {
    addCard(item.name, item.link);
});
