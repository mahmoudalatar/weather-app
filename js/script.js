document.querySelector(".search form").addEventListener("click", (e) => {
  e.preventDefault();
});
let searchInput = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
let apiKey = `https://api.weatherapi.com/v1/forecast.json?key=7e471194bca2406fa8c111754221806&q=Cairo&days=3`;

async function getWeather() {
  let res = await fetch(apiKey);
  let finalRes = await res.json();
  return finalRes;
}

async function getCity(key) {
  let res = await fetch(key);
  let finalRes = await res.json();
  return finalRes;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

searchInput.addEventListener("keyup", async (e) => {
  e.preventDefault();
  if (searchInput.value != "") {
    searchKey =
      "http://api.weatherapi.com/v1/search.json?key=7e471194bca2406fa8c111754221806&q=" +
      searchInput.value;

    let x = await getCity(searchKey);
    for (let i = 0; i < x.length; i++) {
      if (x[i].name.toLowerCase().startsWith(searchInput.value)) {
        console.log(x[i].name.toLowerCase());
        var city = x[i].name;
      }
    }
    city = capitalizeFirstLetter(city);
    console.log(city);
    apiKey = `https://api.weatherapi.com/v1/forecast.json?key=7e471194bca2406fa8c111754221806&q=${city}&days=3`;
    getWeather();
    card();
  }
});

(function () {
  let cardHeader = document.querySelectorAll(".card-header");
  let date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  for (let i = 0; i < cardHeader.length; i++) {
    cardHeader[i].innerHTML = i
      ? `<p class="m-0">${days[date.getDay() + i]}</p>`
      : `<p class="m-0">${
          days[date.getDay() + i]
        }</p><p class="m-0">${date.getDate()}${months[date.getMonth()]}</p>`;
  }
})();

// Tody Card Weather
function card() {
  (async function () {
    let res = await getWeather();
    let cardBodyHeader = document.querySelector(".card-body .card-body-header");
    let num = document.querySelector(".card-degree .num");
    let icon = document.querySelector(".card-degree .num + .weather-icon img");
    let weatherCondition = document.querySelector(".card-body .card-weather");
    let cardIcons = document.querySelectorAll(".card-body span");

    cardBodyHeader.innerHTML = `<h5>${res.location.name}</h5>`;
    num.innerHTML = `${res.current.temp_c}<sup>o</sup>C`;
    icon.setAttribute("src", res.current.condition.icon);
    weatherCondition.innerHTML = res.current.condition.text;

    for (let i = 1; i < cardIcons.length; i++) {
      if (i == 1) {
        cardIcons[1].innerHTML = `<img src="img/icon-wind.png" class="me-1" alt="" /> ${res.current.wind_kph}km/h`;
      }
      if (i == 2) {
        cardIcons[2].innerHTML =
          `<img src="img/icon-compass.png" class="me-1" alt="" />` +
          res.current.wind_dir;
      }
    }
  })();

  // Middle and next card weather
  (async function () {
    let res = await getWeather();
    for (let i = 1; i < 3; i++) {
      let maxTemp = res.forecast.forecastday[i].day.maxtemp_c;
      let minTemp = res.forecast.forecastday[i].day.mintemp_c;
      let conditionText = res.forecast.forecastday[i].day.condition.text;
      let conditionIcon = res.forecast.forecastday[i].day.condition.icon;
      let temp = document.querySelectorAll(".next-day .card-degree .temp")[
        i - 1
      ];
      let icon = document.querySelectorAll(
        ".next-day .card-degree .weather-icon img"
      )[i - 1];
      let condition = document.querySelectorAll(".next-day .card-weather")[
        i - 1
      ];

      temp.innerHTML = `<h2 class="fw-bold text-white">${maxTemp}<sup>o</sup>C</h2>
        <p>${minTemp}<sup>o</sup>C</p>`;
      icon.setAttribute("src", conditionIcon);
      condition.innerHTML = conditionText;
    }
  })();
}

window.onload = function () {
  card();
};
