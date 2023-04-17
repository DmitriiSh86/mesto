class FormValidator {
    constructor(config, formElement) {
      this._form = formElement;
      this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
      this._submitButtonSelector = formElement.querySelector(config.submitButtonSelector);
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
    };
    
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;    
        errorElement.classList.add(this._errorClass);    
    };

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);        
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _hasInvalidInput(){
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        }); 
    };    

    _checkInputValidity(input) {
        if (!input.validity.valid) {        
          this._showInputError(input, input.validationMessage);
        } else {   
          this._hideInputError(input);
        }
    };

    _toggleSubmitState() {
        this._submitButtonSelector.disabled = this._hasInvalidInput();
        if (this._hasInvalidInput() === true) {
          this._submitButtonSelector.classList.add(this._inactiveButtonClass);
        } else {
          this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
        };        
    };

    _setEventListeners() {
        this._inputList.forEach((input) => {
          input.addEventListener('input', () => {
            this._checkInputValidity(input);
            this._toggleSubmitState();
          });
        });
    };

    setInitialState() {
      this._inputList.forEach((input) => {
        this._hideInputError(input);
        this._toggleSubmitState();
      });
    };  
    
    enableValidation() {
      this._setEventListeners();
    };
};

export {FormValidator};