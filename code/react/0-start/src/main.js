/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const mountNode: HTMLElement = document.getElementById('mount');
ReactDOM.render(<App numberOfBoxes="20000" />, mountNode);