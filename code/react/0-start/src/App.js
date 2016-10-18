/* @flow */

import React from 'react';
import Box from './Box';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        const {numberOfBoxes} = this.props;
        const boxes = [];
        for (let i=0; i < numberOfBoxes; i++) {
            const id = i;
            const x = getRandomInt(0, 500);
            const y = getRandomInt(0, 500);
            const box = {
                id,
                x,
                y
            };
            boxes.push(box);
        }
        this.state = {
            boxes,
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
        const box = boxes[id];
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
        const box = boxes[id];
        box.x = x;
        box.y = y;
        this.setState({boxes});
    }

}
