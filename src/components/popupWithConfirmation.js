import {Popup} from './Popup.js'
class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleSubmit) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
      this._handleSubmit = handleSubmit;
    };

    setData(cardId, cardElement){
      this._cardId = cardId;
      this._cardElement = cardElement;
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmit(evt.submitter, this._cardId, this._cardElement);
      });
    };
  
    close() {
      super.close();
      this._form.reset();
    };   
  };

  export {PopupWithConfirmation}