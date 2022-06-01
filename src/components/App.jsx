import React, { Component } from 'react';
import s from './finder.module.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import ImageAPI from './imageAPI';
import ErrorMessage from './ErrorMessage';
import { ToastContainer, toast } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    imageName: '',
    page: 1,
    images: null,
    imagesNew: null,
    error: null,
    status: 'idle',
  };

  handleSubmitOfSearch = searchName => {
    const { imageName } = this.state;
    if (imageName !== searchName) {
      this.setState({ imageName: searchName, page: 1 });
    }
    return;
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName) {
      this.setState({ status: 'pending', images: null });
      ImageAPI(imageName, page)
        .then(this.onData)
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (page > 1 && prevState.page !== page) {
      this.setState({ status: 'pending' });
      ImageAPI(imageName, page)
        .then(this.onData)
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  onData = imagesNew => {
    const { images, page } = this.state;
    if (imagesNew.data.totalHits === 0) {
      this.setState({ error: 'Изображений не найдено', status: 'rejected' });
      toast.warn('Введите корректно поиск!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (images !== imagesNew && imagesNew !== null) {
      if (images === null && page === 1) {
        this.setState({ status: 'resolved', images: imagesNew.data.hits });
      }
      if (page !== 1 && imagesNew !== null) {
        this.setState({
          status: 'resolved',
          images: [...images, ...imagesNew.data.hits],
        });
      }
      return;
    }
  };

  onClickLoadMore = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  render() {
    const { status, error, images } = this.state;
    return (
      <div className={s.App}>
        <Searchbar handleSubmitOfSearch={this.handleSubmitOfSearch} />
        {status === 'rejected' && <ErrorMessage errorMes={error} />}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {images && images.length > 0 && (
          <ImageGallery images={images} status={status} />
        )}
        {status === 'pending' && (
          <div className={s.BallTriangle}>
            <BallTriangle
              type="ThreeDots"
              color="#2BAD60"
              height="100"
              width="100"
            />
          </div>
        )}
        {status === 'resolved' &&
          images &&
          images.length > 0 &&
          images.length !== 0 && <Button onClick={this.onClickLoadMore} />}
      </div>
    );
  }
}
