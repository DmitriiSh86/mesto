function createCard(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardElementPhoto = cardElement.querySelector('.elements__photo');
    cardElement.querySelector('.elements__title').textContent = cardData.name;
    cardElementPhoto.src = cardData.link;
    cardElementPhoto.alt = cardData.name;
    return cardElement;
};


function removeCard(element){
    element.remove();
};


cardsContainerButtons.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('elements__like')) {
        evt.target.classList.toggle('elements__like_type_activ');
    }
    if (evt.target.classList.contains('elements__trash')) {
        const elementDelete = evt.target.closest('.elements__element');
        removeCard(elementDelete);
    }
    if (evt.target.classList.contains('elements__photo')) {
        popupPhotoFullScreen.src = evt.target.src;
        popupPhotoFullScreen.alt = evt.target.alt;
        popupTextFullScreen.textContent = evt.target.alt;
        openPopup(popupPhoto);
    }
});



initialCards.forEach(function (item) {
    const newCard = createCard(item);
    cardsContainer.prepend(newCard);
});