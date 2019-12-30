import axios from 'axios';

export function SorterNumbers(numbers){
  return axios.post('/sort-numbers', {
    numbers: numbers
  })
  .then(function (response) {
    const { data } = response;
    
    return data;
  })
  .catch(function (error) {
    console.log(error);
  });
}