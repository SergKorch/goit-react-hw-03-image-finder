import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static defaultProps = { onClose: null };

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackropClick}>
        <img className={s.Modal} src={this.props.src} alt={this.props.alt} />
      </div>,
      modalRoot
    );
  }
}

export default Modal;
