
import React from 'react';
import {Spinner} from 'spin.js';
// import PropTypes from 'prop-types';
// import s from './ContactListItem.module.css';

const Loader = ({ loading }) => {
    var opts = {
        lines: 13, // The number of lines to draw
        length: 38, // The length of each line
        width: 17, // The line thickness
        radius: 45, // The radius of the inner circle
        scale: 1, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        speed: 1, // Rounds per second
        rotate: 0, // The rotation offset
        animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#141313', // CSS color or array of colors
        fadeColor: 'transparent', // CSS color or array of colors
        top: '50%', // Top position relative to parent
        left: '50%', // Left position relative to parent
        shadow: '0 0 1px transparent', // Box-shadow for the lines
        zIndex: 2000000000, // The z-index (defaults to 2e9)
        className: 'spinner', // The CSS class to assign to the spinner
        position: 'absolute', // Element positioning
      };


    
      var target = document.getElementById('root');
      var spinner = new Spinner(opts).spin(target);

};

// ContactListItem.propTypes = {
//   id: PropTypes.string.isRequired,
//   nameContact: PropTypes.string.isRequired,
//   number: PropTypes.string.isRequired,
//   deleteContact: PropTypes.func.isRequired,
// };

export default Loader;
