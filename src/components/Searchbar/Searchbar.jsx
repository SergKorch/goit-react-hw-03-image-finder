import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './search.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoSearch } from 'react-icons/go';

export class Searchbar extends Component {
  static defaultProps = { handleSubmitOfSearch: null };

  static propTypes = {
    handleSubmitOfSearch: PropTypes.func.isRequired,
  };

  state = {
    imageName: '',
  };

  handleNameChange = e => {
    const { value } = e.currentTarget;
    this.setState({ imageName: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { imageName } = this.state;
    const normalizeImageName = imageName.trim().toLowerCase();
    if (!normalizeImageName) {
      toast.warn('Введите поиск!', {
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
    this.props.handleSubmitOfSearch(normalizeImageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__button__label}>Search</span>
            <GoSearch />
          </button>
          <input
            className={s.SearchForm__input}
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
