import {api} from '../pages/index.js'
class Card {
  constructor(data, templateSelector, handleCardClick, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._data = data;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likeStatus = false;
    this._userId = userId;

    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector('.elements__title');
    this._cardImage = this._element.querySelector('.elements__photo');
    this._cardLikes = this._element.querySelector('.elements__like-number');
    this._heart = this._element.querySelector('.elements__like');
  };

  _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

      return cardElement;
  };

  _setLikeNum(num){
    this._cardLikes.textContent = num;    
  }

  _setLike(){
    this._heart.classList.add('elements__like_type_activ');
    this._likeStatus = true;
  }
  _setDislike(){
    this._heart.classList.remove('elements__like_type_activ');
    this._likeStatus = false; 
  }
  

  _toggleLike(){
        if (this._likeStatus === false){
            this._setLike();         
            api.likeCard(this._cardId)
            .then((result) => this._setLikeNum(result.likes.length));
        } else {
            this._setDislike();                       
            api.dislikeCard(this._cardId)
            .then((result) => this._setLikeNum(result.likes.length));
        }
      
  };

  _handleImageClick(){ 
      this._handleCardClick(this._name, this._link);
  };

  _deleteCard(){
     this._element.remove();
  };

  generateCard() {      
      this._cardTitle.textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;      
      this._setLikeNum(this._likes.length);
      for (let i=0; i<this._data.likes.length; i++){
        if ((this._data.likes[i]._id) === this._userId){            
            this._setLike();
        }
      }
    

      this._setEventListeners();

      return this._element;
  };

  _setEventListeners() {
      this._element.querySelector('.elements__trash').addEventListener('click', (evt) => {
          this._deleteCard();
      });
      this._element.querySelector('.elements__like').addEventListener('click', (evt) => {
          this._toggleLike(evt);
      });
      this._cardImage.addEventListener('click', () => {
          this._handleImageClick()
      });
  };

};

export {Card};