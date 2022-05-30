import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Modal from '../Modal';
import ImageGalleryItem from './ImageGalleryItem';
import s from './gallery.module.css';
import ImageAPI from 'components/imageAPI';
import { BallTriangle } from 'react-loader-spinner';
class ImageGallery extends Component {
  state = {
    loading: false,
    images: null,
    error: null,
    showModal: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const nextSearch = this.props.imageName;
    if (prevProps.imageName !== nextSearch ) {
      console.log(prevProps.page)
      this.setState({ loading: true, images: null });
      ImageAPI(nextSearch, this.props.page)
        .then(images => this.setState({ images }))
        .catch(error => this.setState(error))
        .finally(() => this.setState({ loading: false }));
    }
    if (this.props.page>prevProps.page ) {
      console.log(prevProps.page)
      this.setState({ loading: true, images: null });
      ImageAPI(nextSearch, this.props.page)
        .then(images => this.setState({ images }))
        .catch(error => this.setState(error))
        .finally(() => this.setState({ loading: false }));
    }
    
    this.props.onData(this.state.images);
  }
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
    return (
      <div>
        {this.state.error && <p>ERROR</p>}
        {this.state.loading && (
          <div className={s.BallTriangle}>
            <BallTriangle
              type="ThreeDots"
              color="#2BAD60"
              height="100"
              width="100"
            />
          </div>
        )}
        <ul
          id="gallerySection"
          className={s.ImageGallery}
          onClick={this.imageClick}
        >
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
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            src={this.state.src}
            alt={this.state.alt}
          />
        )}
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
