const showInputError = (formElement, inputElement, errorMessage) => {
    let errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;    
    errorElement.classList.add('popup__input-error_type_activ');
};
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_type_activ');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation(){
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    setEventListeners(formElement);
});
  
}
enableValidation();

function hasInvalidInput(inputList){    
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    }); 
}

function resetErrors(inputData){    
    const formElement = inputData.querySelector('.popup__form');
    const inputElements = inputData.querySelectorAll('.popup__text');
    inputElements.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });
}


function toggleButtonState(inputList, buttonElement){
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_type_inactiv');
    buttonElement.disabled = true;
    } else {
    buttonElement.classList.remove('popup__button_type_inactiv');
    buttonElement.disabled = false;
    } 
}