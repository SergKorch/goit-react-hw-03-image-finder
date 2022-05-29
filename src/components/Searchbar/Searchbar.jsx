
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import s from './search.module.css'

export class Searchbar extends Component {
    state = {
        images:null,
        imageName:'',
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
    // this.props.onSubmit(this.state.imageName)
    this.setState({imageName: ''})
  }
 
    render() {
      return (
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
      );
    }
  }
  

// ContactListItem.propTypes = {
//   id: PropTypes.string.isRequired,
//   nameContact: PropTypes.string.isRequired,
//   number: PropTypes.string.isRequired,
//   deleteContact: PropTypes.func.isRequired,
// };

export default Searchbar;