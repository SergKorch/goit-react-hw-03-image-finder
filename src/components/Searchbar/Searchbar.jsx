import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './search.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  static defaultProps = { onSubmit: null };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    imageName: '',

  };

  handleNameChange = e => {
    const { value } = e.currentTarget;
    this.setState({ imageName: value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    const {imageName}=this.state
    const normalizeImageName = imageName.trim();
    if (!normalizeImageName) {
      toast.warn('Введите поиск!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      return;
    }
    this.props.onSubmit(normalizeImageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__button__label}>Search</span>
          </button>
          <input
            className={s.SearchForm__input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
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
