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
    constructor(data, templateSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
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
        this._handleCardClick(this._name, this._link);
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

export { Card, initialCards };