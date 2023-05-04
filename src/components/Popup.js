class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup-close');
        this._handleEscClose = this._handleEscClose.bind(this);
    };
    
    open(id, card) {
        this._popup.classList.add('popup-open');
        document.addEventListener('keydown', this._handleEscClose);
        this._idCard = id;
        this._card = card;
    };
    
    close() {
        this._popup.classList.remove('popup-open');
        document.removeEventListener('keydown', this._handleEscClose);
    };

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    };

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        };
    };

    setEventListeners() {
        
        this._popup.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt);
        });        
        this._popupCloseButton.addEventListener('click', () => {
            this.close();
        });
    };
};

export {Popup}