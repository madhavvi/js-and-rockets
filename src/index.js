import 'babel-polyfill';
import { prepareData, renderData } from './solution';

// const filterParams = {
//   year: 2018,
//   customerName: 'NASA',
// }

fetch('https://api.spacexdata.com/v3/launches/past')
  // .then(async (response) => await response.json())
  .then(response => response.json())
  .then(results => {
    const JSONData = prepareData(results);
    renderData(JSONData);
  });
