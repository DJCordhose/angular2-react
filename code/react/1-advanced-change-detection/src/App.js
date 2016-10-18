/* @flow */

import React from 'react';
import {List} from 'immutable';

import Box from './Box';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        const {boxes} = this.props;
        this.state = {
            boxes: List(boxes),  // eslint-disable-line new-cap
            currentId: null
        };
    }

    render() {
        const {boxes} = this.state;
        return (
            <div>
                <svg width="550" height="550"
                     onMouseDown={(event) => this.onMouseDown(event)}
                     onMouseUp={(event) => this.onMouseUp(event)}
                     onMouseMove={(event) => this.onMouseMove(event)}
                >
                    <g>
                        {
                            boxes.map((box, index) => <Box key={box.id} box={box}
                                                           selected={box.id === this.state.currentId}/>)
                        }
                    </g>
                </svg>
            </div>);
    }

    onMouseDown(event) {
        const id = Number(event.target.getAttribute("data-id"));
        const {boxes} = this.state;
        const box = boxes.get(id);
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        this.offsetX = box.x - mouseX;
        this.offsetY = box.y - mouseY;
        this.setState({
            currentId: id
        })
    }

    onMouseUp(event) {
        this.setState({
            currentId: null
        })
    }

    onMouseMove(event) {
        if (this.state.currentId !== null) {
            this.updateBox(this.state.currentId, event.clientX + this.offsetX, event.clientY + this.offsetY);
        }
    }

    updateBox(id, x, y) {
        const {boxes} = this.state;
        const modifiedBox = {
            id,
            x,
            y
        };
        const modifiedBoxes = boxes.set(id, modifiedBox);
        this.setState({
            boxes: modifiedBoxes
        });
    }

}
