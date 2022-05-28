import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import s from './phonebook.module.css';
import Modal from './Modal';
// import ContactList from './ContactList';
// import Filter from './Filter';

export class App extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <div className={s.phonebook}>
        {/* <Searchbar /> 
        <ImageGallery /> 
        <ImageGalleryItem /> 
        <Loader />
        <Button /> */}
        <div className={s.Searchbar}>
          <form className={s.SearchForm}>
            <input
              type="text"
              name="searchQuery"
              className={s.SearchForm__input}
              autocomplete="off"
              placeholder="Search images..."
            />
            <button className={s.SearchForm__button} type="submit"></button>
          </form>
        </div>
        <div className={s.ImageGallery}></div>
        <button className={s.Button} type="button">Load more</button>
        {/* <button className={s.Button} onClick={this.toggleModal} type="button">
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
