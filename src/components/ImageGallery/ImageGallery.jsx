import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import s from './gallery.module.css';
import ImageAPI from 'components/imageAPI';

// const ImageGallery = ({ images }) =>
class ImageGallery extends Component {
  state = {
    loading: false,
    images: null,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const nextSearch = this.props.imageName;
    if (prevProps.imageName !== nextSearch) {
      this.setState({ loading: true });
      ImageAPI(nextSearch, 1)
        .then(images => this.setState({ images }))
        .catch((error) => this.setState(error))
        .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>ERROR</p>}
        {!this.state.images && <p>enter search</p>}
        {this.state.loading && <p>ЗАГРУЗКА</p> }
        <ul className={s.ImageGallery}>
          {this.state.images &&
            this.state.images.data.hits.map(
              ({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
              )
            )}
        </ul>
      </div>
    );
  }
}

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
