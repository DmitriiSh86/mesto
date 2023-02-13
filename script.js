let editbutton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let crossbutton = document.querySelector('.popup__cross');

editbutton.addEventListener('click', function () {
    popup.style.display = 'block';
    
    let nameForm = document.getElementById('nameF');
    let jobForm = document.getElementById('jobF');

    nameForm.value = title.textContent;
    jobForm.value = subtitle.textContent;
});

crossbutton.addEventListener('click', function () {
    popup.style.display = 'none';
});

let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let addButton = document.querySelector('.popup__button');
    
function editForm() {
    let nameForm = document.getElementById('nameF');
    let jobForm = document.getElementById('jobF');
    
    title.textContent = nameForm.value;
    subtitle.textContent = jobForm.value;

    popup.style.display = 'none';
  }
  
  addButton.addEventListener('click', editForm);
  
  
  