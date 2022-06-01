import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import ImageGalleryItem from './ImageGalleryItem';
import s from './gallery.module.css';
import { BallTriangle } from 'react-loader-spinner';
class ImageGallery extends Component {
  state = {
    src: null,
    alt: null,
    showModal: false,
  };
  static propTypes = {
    images: PropTypes.array.isRequired,
  };

  imageClick = e => {
    if (e.target.nodeName === 'IMG') {
      this.setState({ src: e.target.src, alt: e.target.alt });
      this.toggleModal();
    }
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { showModal, src, alt } = this.state;
    const { images, loading } = this.props;
    return (
      <div>
        {/* {error && <p>ERROR</p>} */}
        <ul
          id="gallerySection"
          className={s.ImageGallery}
          onClick={this.imageClick}
        >
          {images &&
            images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
        </ul>
        {loading && (
          <div className={s.BallTriangle}>
            <BallTriangle
              type="ThreeDots"
              color="#2BAD60"
              height="100"
              width="100"
            />
          </div>
        )}
        {showModal && <Modal onClose={this.toggleModal} src={src} alt={alt} />}
      </div>
    );
  }
}

export default ImageGallery;
