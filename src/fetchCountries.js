export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(
    response => {
      // if (response.status === 404) {
      //   console.log('ok');
      // }
      return response.json();
    },
  );
}
