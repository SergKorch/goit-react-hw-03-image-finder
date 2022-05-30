import React, { Component } from 'react';
import Notiflix from 'notiflix';
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
  };

  handleSubmit = searchName => {
    if (this.state.imageName !== searchName) {
      this.setState({ imageName: searchName });
    }
    return;
  };
  onData = imagesNew => {
    if (this.state.images !== imagesNew && imagesNew !== null) {
      if (this.state.images === null && this.state.page===1) {
        return this.setState({ images: imagesNew });
      } else {

        console.log('image=', this.state.images);
        console.log('imageNew=', imagesNew);
        // return this.setState({ images: [...this.state.images, ...imagesNew] });
       this.setState({ images:imagesNew});
      }
    }
    return;
  };
  onClick = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleSubmit} />
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
        <ImageGallery
          imageName={this.state.imageName}
          onData={this.onData}
          page={this.state.page}
        />
        {this.state.images && <Button onClick={this.onClick} />}
      </div>
    );
  }
}
