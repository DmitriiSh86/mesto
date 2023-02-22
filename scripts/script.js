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
console.log(formElement);

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

  initialCards.forEach(function (item) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__title').textContent = item.name;
    cardElement.querySelector('.elements__link').insertAdjacentHTML('beforeend', `
    <img
          src="${item.link}"
          
          class="elements__photo"
          alt="${item.name}"
        >
  `);

    cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_type_activ');
    });

    cardList.append(cardElement)
});



