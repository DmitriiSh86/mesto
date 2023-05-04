import {Popup} from './Popup.js'
class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleSubmit) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
      this._handleSubmit = handleSubmit;
    };
  
    setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmit(evt.submitter, this._cardId, this._ardElement);
      });
    };
  
    close() {
      super.close();
      this._form.reset();
    };

    open(cardId, cardElement) {
      this._cardId = cardId;
      this._ardElement = cardElement;
      super.open();    
    }
  };

  export {PopupWithConfirmation}