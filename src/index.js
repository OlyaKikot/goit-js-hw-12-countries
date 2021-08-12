import {
  alert,
  defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import { defaults } from '@pnotify/core';
defaults.hide = true;
defaults.delay = 3000;
defaults.type = 'error';
defaults.minHeight = '130px';
defaults.styling = 'material';
defaults.mode = 'dark';
defaults.icon = true;
defaults.shadow = false;

import createCountriesMarkup from '../src/templates/example.hbs';
import fetchCountries from './fetchCountries';
var _ = require('lodash');

const refs = {
  input: document.querySelector('#inputText'),
  countriesList: document.querySelector('#CountriesList'),
};

refs.input.addEventListener('keydown', _.debounce(createCountries, 500));
function createCountries(searchQuery) {
  const nameCounties = searchQuery.target.value;

  fetchCountries(nameCounties).then(renderMarkup);
}

function renderMarkup(countries) {
  let countriesHTML = '';

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
      text: 'Извените, поиск не дал результатов, попробуйте снова!',
    });
  }
  refs.countriesList.insertAdjacentHTML('afterend', countriesHTML);
}
