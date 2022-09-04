import axios from 'axios';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('.search-input'),
  searchBtn: document.querySelector('.search-btn'),
};

const KEY = '29711315-8270253fad608a552f88c48ec';
const BASE_URL = 'https://pixabay.com/api';
const URL = `${BASE_URL}/?key=${KEY}=cats&image_type&orientation=horizontal&safesearch=true`;

fetch(URL)
  .then(responce => responce.json().then(data => console.log(data)))
  .catch(error => console.log(error));

// refs.input.addEventListener('input', enterData);

// function enterData(e) {
//   e.preventDefault();

//   const inputData = refs.input.value;
//   fetchUserData(inputData);
// }
