import axios from 'axios';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('.search-input'),
  searchBtn: document.querySelector('.search-btn'),
  gallery: document.querySelector(".gallery")
};

function fetchData(data) {
  const KEY = '29711315-8270253fad608a552f88c48ec';
  const BASE_URL = 'https://pixabay.com/api';
  const URL = `${BASE_URL}/?key=${KEY}&q=${data}&image_type&orientation=horizontal&safesearch=true`;

  return fetch(URL).then(responce => responce.json());
}

refs.input.addEventListener('input', onClickBtnSubmit);

function onClickBtnSubmit(event) {
  event.preventDefault();

  const inputData = event.target.value.toLowerCase().trim();

  if (!inputData) {
    refs.gallery.innerHTML = "";
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  } else {
    fetchData(inputData)
    .then(inputData => console.log(inputData))
    .then(checkResponse)
    .then(error => console.log(error));
  }  
}

function checkResponse(response) {
  const dataHits = response.data.hits;
  const totalHits = response.data.totalHits;
  console.log("dataHits", dataHits)
  console.log("totalHits", totalHits)

  if (dataHits.length !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    renderCards(dataHits)
  } else {
    gallery.innerHTML = "";
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
}

function renderCards(data) {
  console.log(data)

const onMarkUp = data.map(({webformatURL, tags, likes, views, comments, downloads}) =>
`<div class="photo-card">
<img src="${webformatURL}" alt="${tags}" loading="lazy" />
<div class="info">
  <p class="info-item">
    <b>Likes</b>${likes}
  </p>
  <p class="info-item">
    <b>Views</b>${views}
  </p>
  <p class="info-item">
    <b>Comments</b>${comments}
  </p>
  <p class="info-item">
    <b>Downloads</b>${downloads}
  </p>
</div>
</div>`, "").join("")

refs.gallery.insertAdjacentHTML("beforeend", onMarkUp);
 }


// function createDataCard({ webformatURL, tags, likes, views, comments, downloads}) {
// console.log(data)

//  return `<a href="${largeImageURL}">
//  <div class="photo-card">
//  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//  <div class="info">
//    <p class="info-item">
//      <b>Likes</b>
//      ${likes}
//    </p>
//    <p class="info-item">
//      <b>Views</b>
//      ${views}
//    </p>
//    <p class="info-item">
//      <b>Comments</b>
//      ${comments}
//    </p>
//    <p class="info-item">
//      <b>Downloads</b>
//      ${downloads}
//    </p>
//  </div>
//  </div>
// </a>`
 
 
 
 
 
 
 
//  `<div class="photo-card">
//  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//  <div class="info">
//    <p class="info-item">
//      <b>Likes</b>
//      ${likes}
//    </p>
//    <p class="info-item">
//      <b>Views</b>
//      ${views}
//    </p>
//    <p class="info-item">
//      <b>Comments</b>
//      ${comments}
//    </p>
//    <p class="info-item">
//      <b>Downloads</b>
//      ${downloads}
//    </p>
//  </div>
// </div>`


// }

// function createDataCards({ webformatURL, views, comments, downloads }) {
//   return `<div class="gallery">
//     <div class="photo-card">
//       <img src="${webformatURL}" alt="" loading="lazy" />
//       <div class="info">
//         <p class="info-item">
//           <b>Likes</b>
//           ${likes}
//         </p>
//         <p class="info-item">
//           <b>Views</b>
//           ${views}
//         </p>
//         <p class="info-item">
//           <b>Comments</b>
//           ${comments}
//         </p>
//         <p class="info-item">
//           <b>Downloads</b>
//           ${downloads}
//         </p>
//       </div>
//     </div>
//   </div>`;
// }
