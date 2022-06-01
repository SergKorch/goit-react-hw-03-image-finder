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
    if (this.state.imageName !== searchName) {
      this.setState({ imageName: searchName, page: 1 });
    }
    return;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imageName !== this.state.imageName) {
      this.setState({ loading: true, images: null });
      ImageAPI(this.state.imageName, this.state.page)
        .then(this.onData)
        .catch(error => this.setState(error))
        .finally(() => this.setState({ loading: false }));
    }
    if (this.state.page > 1 && prevState.page !== this.state.page) {
      this.setState({ loading: true });
      ImageAPI(this.state.imageName, this.state.page)
        .then(this.onData)
        .catch(error => this.setState(error))
        .finally(() => this.setState({ loading: false }));
    }
  }
  onData = imagesNew => {
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
    if (this.state.images !== imagesNew && imagesNew !== null) {
      if (this.state.images === null && this.state.page === 1) {
        this.setState({ images: imagesNew.data.hits });
      }
      if (this.state.page !== 1 && imagesNew !== null) {
        this.setState({
          images: [...this.state.images, ...imagesNew.data.hits],
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
    return (
      <div className={s.App}>
        <Searchbar handleSubmitOfSearch={this.handleSubmitOfSearch} />
        {this.state.status === 'rejected' && (
          <div className={s.Error}>
            <p>{`Something went wrong! ${this.state.error}`}</p>
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
        {this.state.images && (
          <ImageGallery
            images={this.state.images}
            loading={this.state.loading}
          />
        )}
        {this.state.images &&
          !this.state.loading &&
          this.state.images.length !== 0 && (
            <Button onClick={this.onClickLoadMore} />
          )}
      </div>
    );
  }
}
