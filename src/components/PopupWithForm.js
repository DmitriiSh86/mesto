import {Popup} from './Popup.js'

class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
      this._inputList = Array.from(this._form.querySelectorAll('.popup__text'));
      this._handleSubmit = handleSubmit;
    };
  
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
        this._handleSubmit(this._getInputValues());
        this.close();
      });
    };
  
    close() {
      super.close();
      this._form.reset();
    };
  };

  export {PopupWithForm}