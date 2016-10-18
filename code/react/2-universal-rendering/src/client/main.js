/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../common/App';

const initialState = window.__INITIAL_STATE__;
const {boxes, numberOfSegments} = initialState;

const mountNode: HTMLElement = document.getElementById('mount');
ReactDOM.render(<App boxes={boxes} numberOfSegments={100}/>, mountNode);