import React from 'react';
// import PropTypes from 'prop-types';
import s from './item.module.css'

const ImageGalleryItem = ({  largeImageURL, webformatURL, tags }) => {
  return (
    <li className={s.ImageGalleryItem}>
        {/* <a className={s.ImageGalleryItem__image} href={largeImageURL}> */}
          <img className={s.ImageGalleryItem__image} src={webformatURL} alt={tags} loading="lazy" />
        {/* </a> */}
    </li>
  );
};

// ContactListItem.propTypes = {
//   id: PropTypes.string.isRequired,
//   nameContact: PropTypes.string.isRequired,
//   number: PropTypes.string.isRequired,
//   deleteContact: PropTypes.func.isRequired,
// };

export default ImageGalleryItem;
