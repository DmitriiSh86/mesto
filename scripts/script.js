let editbutton = document.querySelector('.profile__edit-button');
let popupForm = document.querySelector('.popup');
let closeButton = document.querySelector('.popup-close');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_job');
let titleInfo = document.querySelector('.profile__title');
let subtitleInfo = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');


function closePopup() {
    popupForm.classList.remove('popup-open');
}
function openPopup() {
    popupForm.classList.add('popup-open');
}


editbutton.addEventListener('click', function () {
    openPopup();
    nameInput.value = titleInfo.textContent;
    jobInput.value = subtitleInfo.textContent;
});

closeButton.addEventListener('click', function () {
    closePopup();
});

function handleFormSubmit (evt) {
    evt.preventDefault();
    titleInfo.textContent = nameInput.value;
    subtitleInfo.textContent = jobInput.value;
    closePopup();
};

formElement.addEventListener('submit', handleFormSubmit);