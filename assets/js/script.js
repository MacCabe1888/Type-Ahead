const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(res => res.json())
  .then(data => cities.push(...data));

function findMatches(regex, cities) {
  return cities.filter(obj => obj.city.match(regex) || obj.state.match(regex) || `${obj.city}, ${obj.state}`.match(regex));
}

function displayMatches() {
  const regex = new RegExp(this.value, "gi");
  const matches = findMatches(regex, cities);
  const html = matches.map(obj => {
    const matchingText = `${obj.city}, ${obj.state}`.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${matchingText}</span>
        <span class="population">${obj.population}</span>
      </li>
    `;
  }).join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
