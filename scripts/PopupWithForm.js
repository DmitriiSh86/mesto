import {Popup} from './Popup.js'
import {UserInfo} from './UserInfo.js'

class PopupWithForm extends Popup {
    constructor(popupSelector, handleCardFormSubmit) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
      this._inputList = Array.from(this._form.querySelectorAll('.popup__text'));
      this._handleCardFormSubmit = handleCardFormSubmit;
    }
  
    _getInputValues() {
      const inputValues = {};
      this._inputList.forEach((input) => {
        inputValues[input.id] = input.value;
      });


      return inputValues;
    };
  
    setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleCardFormSubmit(this._getInputValues());
      });
    };
  
    close() {
      super.close();
    }
  }

  export {PopupWithForm}