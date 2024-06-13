const API_KEY = 'Kur8S15D2XGaxPLOTCzmmAUEcQCC0VbVpsm3TGXs2X2F2FKInXgJ0Tjl';
const BASE_URL = 'https://api.pexels.com/v1/';

document.getElementById('load-images').addEventListener('click', () => loadImages('your-query'));
document.getElementById('load-secondary-images').addEventListener('click', () => loadImages('your-secondary-query'));

async function loadImages(query) {
  const url = new URL(`${BASE_URL}search`);
  url.search = new URLSearchParams({ query });

  const response = await fetch(url, {
    headers: {
      Authorization: API_KEY,
    },
  });

  const data = await response.json();
  displayImages(data.photos);
}

function displayImages(photos) {
  const gallery = document.getElementById('image-gallery');
  gallery.innerHTML = '';

  photos.forEach(photo => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.alt;
    img.addEventListener('click', () => showImageDetails(photo.id));

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = photo.photographer;
    cardTitle.addEventListener('click', () => showImageDetails(photo.id));

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = photo.id;

    const hideButton = document.createElement('button');
    hideButton.classList.add('btn', 'btn-primary');
    hideButton.textContent = 'Hide';
    hideButton.addEventListener('click', () => card.style.display = 'none');

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(hideButton);
    card.appendChild(img);
    card.appendChild(cardBody);
    gallery.appendChild(card);
  });
}

async function showImageDetails(photoId) {
  const url = `${BASE_URL}photos/${photoId}`;

  const response = await fetch(url, {
    headers: {
      Authorization: API_KEY,
    },
  });

  const photo = await response.json();
  displayImageDetails(photo);
}

function displayImageDetails(photo) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');

  modalImg.src = photo.src.large;
  modalCaption.innerHTML = `
    <h2>${photo.photographer}</h2>
    <a href="${photo.photographer_url}" target="_blank">View photographer's profile</a>
  `;

  modal.style.display = 'block';

  const span = document.getElementsByClassName('close')[0];
  span.onclick = function() {
    modal.style.display = 'none';
  }
}

document.getElementById('search-field').addEventListener('input', (e) => {
  const query = e.target.value;
  if (query) {
    loadImages(query);
  }
});
