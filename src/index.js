import {
  alert,
  defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

import '@pnotify/core/dist/BrightTheme.css';

import createCountriesMarkup from '../src/templates/example.hbs';
import fetchCountries from './fetchCountries';
var _ = require('lodash');
const refs = {
  input: document.querySelector('#inputText'),
  countriesList: document.querySelector('#CountriesList'),
};

refs.input.addEventListener('keydown', _.debounce(createCountries, 500));

function createCountries(searchQuery) {
  let nameCounties = searchQuery.target.value;
  fetchCountries(nameCounties).then(renderMarkup).catch(onError);
}

function onError(error) {
  console.log(error);
}

function renderMarkup(countries) {
  let countriesHTML = '';
  refs.countriesList.innerHTML = '';

  if (countries.length < 2) {
    countriesHTML = countries
      .map(country => createCountriesMarkup(country))
      .join('');
  } else if (countries.length < 10) {
    countriesHTML = countries
      .map(country => `<li>${country.name}</li>`)
      .join('');
  } else {
    defaultModules.set(PNotifyMobile, {});
    alert({
      text: 'Пожалуйста, уточните критерии поиска',
      type: 'error',
      maxTextHeight: '200px',
      hide: true,
      delay: 3000,
      minHeight: '100px',
    });
  }
  refs.countriesList.insertAdjacentHTML('beforeend', countriesHTML);
}
