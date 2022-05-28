import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('Eskape');
      this.props.onClose();
    }
  };
  handleBackropClick=e=>{
    if (e.currentTarget === e.target) {
        console.log('Eskape');
        this.props.onClose();
      }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    return createPortal(
    //   <div className={s.Overlay} onClick={this.handleBackropClick}>
    //     <div className={s.Modal}>{this.props.children}</div>
    //   </div>
      <div className={s.Overlay} onClick={this.handleBackropClick}>
      <div className={s.Modal}>{this.props.children}
        <img src="" alt="" />
      </div>
    </div>,
      modalRoot
    );
  }
}

export default Modal;
