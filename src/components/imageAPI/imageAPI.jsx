import axios from 'axios';

const ImageAPI = (q, page) => {
 const options= {
    params: {
      key: '25851309-821f4925948fb0248b82aee73',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      q,
      page,
    },
  }
  return axios.get('https://pixabay.com/api/', options)
};
// .then(response => {
//   if (response.ok) {
//     return response.json();
//   }
//   return Promise.reject(new Error('No correct Name'));
// }).
export default ImageAPI;
