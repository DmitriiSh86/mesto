import {config} from './constants.js'

const formList = Array.from(document.querySelectorAll(config.formSelector));
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddProfile = document.querySelector('.profile__add-button');
const buttonEditAvatar = document.querySelector('.profile__avatar-box');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');

export {formList, buttonEditProfile, buttonAddProfile, nameInput, jobInput, buttonEditAvatar}