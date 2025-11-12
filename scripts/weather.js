// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// API URL with parameters for location (lat, lon), units (imperial), and API key
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=a94731ec57187d9a115b083b5ba60114';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // for testing
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  // display temperature in Fahrenheit
  currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;F`;

  // construct icon source and description
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const desc = data.weather[0].description;

  // update HTML
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}

// invoke the function
apiFetch();
