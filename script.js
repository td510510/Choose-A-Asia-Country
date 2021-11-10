'use strict';

const countriesContainer = document.querySelector('.countries');
const countriesAsiaEl = document.querySelector('.countries-name');
const countryEl = document.querySelector('.country');
///////////////////////////////////////
const renderCountry = function (data) {
  const html = `
        <article class="country">
              <img class="country__img" src="${data.flags.svg}" />
              <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  data.population / 1000000
                ).toFixed(1)}M people</p>
              </div>
        </article>
      `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderAsiaCountries = function (data) {
  const html = `
  <button>${data.name.common}</button>
      `;
  countriesAsiaEl.insertAdjacentHTML('beforeend', html);
  countriesAsiaEl.style.opacity = 1;
};

const getAsianCountries = async function () {
  const countriesList = await fetch(
    'https://restcountries.com/v3.1/region/asia'
  )
    .then(res => res.json())
    .then(data => data);
  countriesList.map(country => renderAsiaCountries(country));
};

getAsianCountries();

countriesAsiaEl.addEventListener('click', function (e) {
  countriesContainer.innerHTML = '';
  let country = e.target.textContent;
  console.log(country);
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => res.json())
    .then(data => renderCountry(data[0]));
});
