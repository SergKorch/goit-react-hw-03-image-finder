import React, { Component } from 'react';
import s from './finder.module.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import ImageAPI from './imageAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    imageName: '',
    loading: false,
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
      this.setState({ loading: true, images: null });
      ImageAPI(imageName, page)
        .then(this.onData)
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ loading: false }));
    }
    if (page > 1 && prevState.page !== page) {
      this.setState({ loading: true });
      ImageAPI(imageName, page)
        .then(this.onData)
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  onData = imagesNew => {
    const { images, page } = this.state;
    if (imagesNew.data.totalHits === 0) {
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
        this.setState({ images: imagesNew.data.hits });
      }
      if (page !== 1 && imagesNew !== null) {
        this.setState({
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
    const { status, error, images, loading } = this.state;
    return (
      <div className={s.App}>
        <Searchbar handleSubmitOfSearch={this.handleSubmitOfSearch} />
        {status === 'rejected' && (
          <div className={s.Error}>
            <p>{`Whoops, something went wrong: ${error}`}</p>
          </div>
        )}
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
          <ImageGallery images={images} loading={loading} />
        )}
        {images && images.length > 0 && !loading && images.length !== 0 && (
          <Button onClick={this.onClickLoadMore} />
        )}
      </div>
    );
  }
}
