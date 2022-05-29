import React, { Component } from 'react';
import Notiflix from 'notiflix';
import s from './phonebook.module.css';
import Modal from './Modal';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import {Spinner} from 'spin.js';
import ImageAPI from './imageAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    imageName: '',
    showModal: false,
    loading: false,
    page:1,
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.imageName);
    console.log(this.props.imageName);
  }
  handleSubmit = (searchName)  => {
    if (this.state.imageName !== searchName) {
      this.setState({ imageName: searchName});
    }
    return;
  };
  onData=(imagesNew)=>{
    if (this.state.images !== imagesNew) {
      this.setState({ images: imagesNew});
    }
    return;
  }
  onClick=()=> {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  }
  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

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
        <ImageGallery imageName={this.state.imageName} onData={this.onData} page={this.state.page}/>
        
        {this.state.images && <Button onClick={this.onClick} />}
        {/* 
        <button className={s.Button} onClick={this.toggleModal} type="button">
          Open modal
        </button>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
              temporibus, iusto veniam explicabo earum eligendi ex dolor, dolore
              mollitia modi laudantium similique recusandae maiores praesentium
              quis quaerat sint impedit repellat.
            </p>
            <button onClick={this.toggleModal} type="button">
              Close
            </button>
          </Modal>
        )} */}
      </div>
    );
  }
}
