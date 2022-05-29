import React from 'react';
// import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import s from './gallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={s.ImageGallery}>
      {images &&
        images.data.hits.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        ))}
    </ul>
  );
};

// ContactList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     }).isRequired
//   ),
//   deleteContact: PropTypes.func.isRequired,
// };
export default ImageGallery;
