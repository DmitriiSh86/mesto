import {Popup} from './Popup.js'

class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._image = this._popup.querySelector('.popup__photo');
      this._text = this._popup.querySelector('.popup__photo-text');
    };
  
    open(name, link) {
      this._image.src = link;
      this._image.alt = name;
      this._text.textContent = name;
      super.open();
    };
};

export {PopupWithImage}