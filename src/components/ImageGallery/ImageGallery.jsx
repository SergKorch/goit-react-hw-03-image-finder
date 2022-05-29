import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import s from './gallery.module.css';
import ImageAPI from 'components/imageAPI';
import Loader from '../Loader';
import { Watch } from 'react-loader-spinner';
class ImageGallery extends Component {
  state = {
    loading: false,
    images: null,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const nextSearch = this.props.imageName;
    if (prevProps.imageName !== nextSearch) {
      this.setState({ loading: true, images: null });
      ImageAPI(nextSearch, 1)
        .then(images => this.setState({ images }))
        .catch(error => this.setState(error))
        .finally(() => this.setState({ loading: false }));
        
    }
    this.props.onData(this.state.images);
  }
  render() {
    return (
      <div>
        {this.state.error && <p>ERROR</p>}

        {this.state.loading &&  (<div >
            <Watch
              color="#00BFFF"
              height={200}
              width={200}
              ariaLabel="loading"
            />
          </div>)}
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
