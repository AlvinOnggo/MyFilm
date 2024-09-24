var filmData = [];

function createCard(film, container) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundImage = `url(${film.image})`;

  const cardHover = document.createElement("div");
  cardHover.className = "card-hover";
  card.appendChild(cardHover);

  const img = document.createElement("img");
  img.src = film.imageCard;
  img.className = "card-img";
  cardHover.appendChild(img);

  const cardDescription = document.createElement("div");
  cardDescription.className = "card-description";
  cardHover.appendChild(cardDescription);

  const imgTitle = document.createElement("img");
  imgTitle.src = film.title;
  imgTitle.className = "title-img";
  cardDescription.appendChild(imgTitle);

  const button = document.createElement("div");
  button.className = "button";
  cardDescription.appendChild(button);

  const watchNowLink = document.createElement("a");
  watchNowLink.href = "#";
  watchNowLink.innerHTML = '<i class="fa fa-play"></i>Watch Now';
  button.appendChild(watchNowLink);

  const plusLink = document.createElement("a");
  plusLink.href = "#";
  plusLink.innerHTML = '<i class="fa fa-plus"></i>';
  button.appendChild(plusLink);

  const descriptionText = document.createElement("div");
  descriptionText.className = "description-text";
  cardDescription.appendChild(descriptionText);

  const span1 = document.createElement("span");
  span1.textContent = film.year;
  descriptionText.appendChild(span1);

  const span2 = document.createElement("span");
  span2.textContent = film.type;
  descriptionText.appendChild(span2);

  const span3 = document.createElement("span");
  span3.textContent = film.country;
  descriptionText.appendChild(span3);

  const span4 = document.createElement("span");
  span4.textContent = film.age;
  descriptionText.appendChild(span4);

  const span5 = document.createElement("span");
  span5.textContent = film.genre;
  descriptionText.appendChild(span5);

  const p = document.createElement("p");
  p.textContent = film.synopsis;
  descriptionText.appendChild(p);

  container.appendChild(card);
}

fetch("./db.json")
  .then((response) => response.json())
  .then((data) => {
    filmData.push(...data.filmData.movie);
    filmData.push(...data.filmData.anime);
    filmData.push(...data.filmData.recommendation);
    filmData.push(...data.filmData.anime);
    filmData.push(...data.filmData.recommendation);

    const container = document.querySelector(".all-film");
    filmData.forEach((film) => createCard(film, container));
  })
  .catch((error) => console.error("Error:", error));

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("search").addEventListener("input", function () {
    var searchTerm = this.value.toLowerCase();
    var cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
      var title = card.querySelector(".title").textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});
