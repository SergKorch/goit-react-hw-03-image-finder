import React, { Component } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import s from './phonebook.module.css';
import Modal from './Modal';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Loader from './Loader';

export class App extends Component {
  state = {
    images: null,
    imageName: '',
    showModal: false,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get('https://pixabay.com/api/', this.state.options)
      .then(images => this.setState({ images }))
      .finally(() => this.setState({ loading: false }));
  }
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar />
        <ImageGallery images={this.state.images} />
        {/* <Loader loading={this.state.loading} /> */}
        <Button page={1} />
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
