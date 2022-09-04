import axios from 'axios';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('.search-input'),
  searchBtn: document.querySelector('.search-btn'),
};

function fetchData(data) {
  const KEY = '29711315-8270253fad608a552f88c48ec';
  const BASE_URL = 'https://pixabay.com/api';
  const URL = `${BASE_URL}/?key=${KEY}&q=${data}&image_type&orientation=horizontal&safesearch=true`;

  return fetch(URL).then(responce => responce.json());
}

refs.input.addEventListener('input', searchInfo);

function searchInfo(e) {
  e.preventDefault();

  const inputData = refs.input.value;
  console.log(inputData);

  fetchData(inputData)
    .then(data => console.log(data))
    .catch(error => console.log(error));
}
