var recommendation = [];
var trending = [];
var anime = [];
var movieOfTheWeek = [];

let timeoutId;
let isFirstLoad = true;
window.onload = function () {
  changeBg("slide1.jpg", "suzume-title");
};
function changeBg(bg, title) {
  const banner = document.querySelector(".banner-content");
  const contents = document.querySelectorAll(".content");
  const videos = document.querySelectorAll(".banner-video");

  banner.style.backgroundImage = `url('../assets/${bg}')`;
  banner.style.backgroundSize = "cover";
  banner.style.backgroundPosition = "center";
  videos.volume = 0.1;

  contents.forEach((element) => {
    element.classList.remove("active");
    if (element.classList.contains(title)) {
      element.classList.add("active");
    }
  });

  videos.forEach((video) => {
    video.classList.remove("active");
    video.pause(); // Pause all videos
    if (video.classList.contains(title)) {
      video.currentTime = 0;
    }
  });

  // reset timeout
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  // Add a delay sebelum tampilin videonya
  timeoutId = setTimeout(() => {
    const activeVideo = document.querySelector(".banner-video." + title);
    if (activeVideo) {
      if (isFirstLoad) {
        activeVideo.muted = true; //mute video ketika page pertama kali load
      }
      activeVideo.classList.add("active");
      activeVideo.classList.add("fade-in"); //add transisi
      activeVideo.play();
    }
  }, 2500);

  window.addEventListener("scroll", () => {
    const activeVideo = document.querySelector(".banner-video.active");
    if (activeVideo) {
      if (window.scrollY > window.innerHeight) {
        // Pause video ketika user scroll kebawah
        activeVideo.pause(); // Pause the video
      } else {
        activeVideo.play(); // Play the video
      }
    }
  });
}

fetch("./db.json")
  .then((response) => response.json())
  .then((data) => {
    recommendation.push(...data.filmData.movie);
    recommendation.push(...data.filmData.anime);
    movieOfTheWeek.push(...data.filmData.recommendation);
    anime.push(...data.filmData.anime);
    trending.push(...data.filmData.recommendation);

    const container = document.querySelector(".recommendation");
    const containerMovie = document.querySelector(".movie-of-the-week");
    const trendingContainer = document.querySelector(".trending");
    const animeContainer = document.querySelector(".anime");

    trending.forEach((film) => createCard(film, trendingContainer));
    recommendation.forEach((film) => createCard(film, container));
    movieOfTheWeek.forEach((film) => createCard(film, containerMovie));
    anime.forEach((film) => createCard(film, animeContainer));
  })
  .catch((error) => console.error("Error:", error));

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

var scrollAmount = 500;

document.querySelectorAll(".scroll-left").forEach(function (element) {
  element.addEventListener("click", function () {
    this.nextElementSibling.scrollLeft -= scrollAmount;
  });
});

document.querySelectorAll(".scroll-right").forEach(function (element) {
  element.addEventListener("click", function () {
    this.previousElementSibling.scrollLeft += scrollAmount;
  });
});

document.querySelectorAll(".scroll-right").forEach(function (element) {
  element.addEventListener("click", function () {
    this.previousElementSibling.scrollLeft += scrollAmount;
    updateMuteStatus(); // Update the mute status when the background changes
  });
});

var volumeHighIcon = document.querySelector(".fa-volume-high");
var volumeXmarkIcon = document.querySelector(".fa-volume-xmark");
var isMuted = true;

volumeXmarkIcon.addEventListener("click", function () {
  isMuted = false;
  updateMuteStatus();
});

volumeHighIcon.addEventListener("click", function () {
  isMuted = true;
  updateMuteStatus();
});

function updateMuteStatus() {
  var video = document.querySelector(".banner-video.active");
  if (video) {
    video.muted = isMuted;
    volumeHighIcon.style.display = isMuted ? "none" : "";
    volumeXmarkIcon.style.display = isMuted ? "" : "none";
  }
}

updateMuteStatus();


var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.attributeName === "class" && mutation.target.classList.contains("active")) {
      updateMuteStatus();
    }
  });
});

var videos = document.querySelectorAll(".banner-video");
videos.forEach(function (video) {
  observer.observe(video, { attributes: true });
});
