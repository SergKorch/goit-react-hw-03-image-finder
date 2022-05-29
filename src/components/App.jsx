import React, { Component } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import s from './phonebook.module.css';
import Modal from './Modal';
// import ContactList from './ContactList';
// import Filter from './Filter';

export class App extends Component {
  state = {
      images:null,
      imageName:'',
    showModal: false,
    loading: false,
    options: {
      params: {
        key: '25851309-821f4925948fb0248b82aee73',
        q: '',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 39,
      },
    },
  };

handleNameChange=e=>{
  this.setState({imageName: e.currentTarget.value.toLowerCase()})
}
handleSubmit=e=>{
  e.preventDefault()
  this.props.onSubmit(this.state.imageName)
  this.setState({imageName: ''})
}
 async componentDidMount() {
   this.setState({loading:true})
     axios.get('https://pixabay.com/api/', this.state.options)
      .then(images=>this.setState({images})).finally(()=> this.setState({loading:false}));
    // return response;
  }
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
          <form onSubmit={this.handleSubmit} className={s.SearchForm}>
            <input
              className={s.SearchForm__input}
              type="text"
              autocomplete="off"
              autofocus
              placeholder="Search images and photos"
              value={this.state.imageName}
              onChange={this.handleNameChange}
            />
            <button type="submit" className={s.SearchForm__button}>
              <span className={s.SearchForm__button__label}>Search</span>
            </button>
          </form>
        </div>
        <container>
          {this.state.loading && <p>Loading...</p>}
          {this.state.images && (<ul className={s.ImageGallery}><div>{this.state.images.data.hits[0].user}</div></ul>)}
          <button className={s.Button} type="button">
            Load more
          </button>
        </container>
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
