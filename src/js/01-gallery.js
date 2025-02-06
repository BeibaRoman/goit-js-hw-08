// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
console.log(galleryItems);

const gallery = document.querySelector('.gallery');

function makeMarkupCard({ preview, original, description }) {
  return `<li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
</li>`;
}

// console.log(makeMarkupCard(galleryItems[0]));
const makeMarkupGellaryCards = galleryItems.map(makeMarkupCard).join('');
console.log(makeMarkupGellaryCards);

gallery.insertAdjacentHTML('beforeend', makeMarkupGellaryCards);

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
