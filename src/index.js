// import axios from 'axios';
// import Notiflix from 'notiflix';

// =================================================
// 1. index.js

import { formEl, loadMoreBtnEl } from './ref';
import { onClickLonBtnSubmit, onClickAddPage } from './onClickLonBtnSubmit';

formEl.addEventListener('submit', onClickLonBtnSubmit);
loadMoreBtnEl.addEventListener('click', onClickAddPage);

// =================================================
// 2. refs

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('.search-form__input');
const loadMoreBtnEl = document.querySelector('.load-more');

export { galleryEl, formEl, inputEl, loadMoreBtnEl };

// =================================================
// 3. fetchData
  
  const axios = require('axios').default;

const fetchData = async (value, step) => {
  const response = await axios.get(
    `https://pixabay.com/api/?key=29183300-4ae58040b754f339761bcd063&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${step}`
  );
  return response;
};

export default fetchData;

// =================================================
// 4. checkResponce

import createGalleryListMarkup from './renderMarkup';
import Notiflix from 'notiflix';
import checkPhotoAmmount from './checkPhotoAmmount';
import { galleryEl } from './ref';

function checkResponse(response) {
  const dataHits = response.data.hits;
  const totalHits = response.data.totalHits;
  checkPhotoAmmount(response);
  if (dataHits.length !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    createGalleryListMarkup(dataHits);
  } else {
    galleryEl.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

export default checkResponse;

// =================================================
// 5. checkPhotoAmount

import { loadMoreBtnEl } from './ref';

function checkPhotoAmmount(response) {
  const photoPerPage = 40;
  const dataTotalHits = response.data.totalHits;
  if (dataTotalHits > photoPerPage) {
    loadMoreBtnEl.classList.remove('is-hidden');
  } else {
    loadMoreBtnEl.classList.add('is-hidden');
  }
}

export default checkPhotoAmmount;

// =================================================
// 6. onClickLonBtnSubmit

import Notiflix from 'notiflix';
import { galleryEl, loadMoreBtnEl } from './ref';
import fetchData from './fetchData';
import checkResponse from './checkResponse';
import onClickLoadMore from './onClickLoadMore';

let value = null;
let stepPage = 1;

function onClickLonBtnSubmit(event) {
  event.preventDefault();
  value = event.target.searchQuery.value.toLowerCase().trim();

  if (!value) {
    galleryEl.innerHTML = '';
    loadMoreBtnEl.classList.add('is-hidden');
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else {
    galleryEl.innerHTML = '';
    fetchData(value, stepPage)
      .then(checkResponse)
      .catch(error => console.log(error));
  }
}

function onClickAddPage() {
  stepPage += 1;
  fetchData(value, stepPage)
    .then(data => onClickLoadMore(data, stepPage))
    .catch(error => console.log(error));
}

export { onClickLonBtnSubmit, onClickAddPage };

// =================================================
// 7. onClickLoadMore

import Notiflix from 'notiflix';
import { galleryEl, loadMoreBtnEl } from './ref';
import createGalleryListMarkup from './renderMarkup';
import endlessScroll from './endlessScroll';

function onClickLoadMore(response, step) {
  const dataTotalPhoto = response.data.totalHits;
  const dataTotalImg = response.data.hits;
  const totalPages = dataTotalPhoto / 40;

  if (step > totalPages) {
    loadMoreBtnEl.classList.add('is-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
  createGalleryListMarkup(dataTotalImg);
  endlessScroll(galleryEl);
}

export default onClickLoadMore;

// =================================================
// 8. renderMarkUp

import { galleryEl } from './ref';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const createGalleryListMarkup = gallery => {
  const markup = gallery
    .map(
      ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
        `<a class="gallery__link" href="${largeImageURL}"><div class="photo-card">
        <div class="gallery__thumb">
  <img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </div>
  <div class="gallery-info__box">
    <p class="gallery-info__item">
      <b>Likes: <br>${likes}</b>
    </p>
    <p class="gallery-info__item">
      <b>Views: <br>${views}</b>
    </p>
    <p class="gallery-info__item">
      <b>Comments: <br>${comments}</b>
    </p>
    <p class="gallery-info__item">
      <b>Downloads:<br> ${downloads}</b>
    </p>
  </div>
</div></a>`,
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  const lightBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    animationSpeed: 250,
  });
  lightBox.refresh();
};

export default createGalleryListMarkup;

// =================================================
// 9. endLessScroll

function endlessScroll(gallery) {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export default endlessScroll;

// =================================================