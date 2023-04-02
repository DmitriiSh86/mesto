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
   
    _handleOpenPopup() {
        popupImage.src = this._image;
        popupElement.classList.add('popup_is-opened');
    }
        
    _handleClosePopup() {
        popupImage.src = '';
        popupElement.classList.remove('popup_is-opened');
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