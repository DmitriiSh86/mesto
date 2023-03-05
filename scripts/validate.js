const validationParametrs = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_type_inactiv',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_type_activ'
};

const showInputError = (formElement, inputElement, errorMessage, parametrs) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(parametrs.inputErrorClass);
    errorElement.textContent = errorMessage;    
    errorElement.classList.add(parametrs.errorClass);    
};
  
const hideInputError = (formElement, inputElement, parametrs) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(parametrs.inputErrorClass);
    errorElement.classList.remove(parametrs.errorClass);
    errorElement.textContent = '';
};

function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }); 
};

function resetErrors(inputData, parametrs){
    const formElement = inputData.querySelector(parametrs.formSelector);
    const inputElements = inputData.querySelectorAll(parametrs.inputSelector);
    inputElements.forEach((inputElement) => {
        hideInputError(formElement, inputElement, parametrs);
    });    
};

function setDefaultSubmitButton (popupItem, parametrs){
    const formElement = popupItem.querySelector(parametrs.formSelector);
    const inputList = Array.from(popupItem.querySelectorAll(parametrs.inputSelector));
    const buttonElement = popupItem.querySelector(parametrs.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, parametrs);
};

function toggleButtonState(inputList, buttonElement, parametrs){
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(parametrs.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(parametrs.inactiveButtonClass);
        buttonElement.disabled = false;
    } 
};

const checkInputValidity = (formElement, inputElement, parametrs) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, parametrs);
    } else {
      hideInputError(formElement, inputElement, parametrs);
    }
};

const setEventListeners = (formElement, parametrs) => {
    const inputList = Array.from(formElement.querySelectorAll(parametrs.inputSelector));
    const buttonElement = formElement.querySelector(parametrs.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, parametrs);
    inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement, parametrs);
          toggleButtonState(inputList, buttonElement, parametrs);
          });
    });
};

function enableValidation(parametrs){
    const formList = Array.from(document.querySelectorAll(parametrs.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, parametrs);
    });
};

enableValidation(validationParametrs);