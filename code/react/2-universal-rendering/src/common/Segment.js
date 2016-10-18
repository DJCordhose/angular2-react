/* @flow */

import React from 'react';
import {List} from 'immutable';

import Box from './Box';


export default class Segment extends React.Component {
    shouldComponentUpdate(nextProps) {
        const changed = this.props.currentId !== nextProps.currentId ||
            this.props.containsSelected !== nextProps.containsSelected ||
            this.props.boxes !== nextProps.boxes;
        return changed;
    }

    render() {
        const {boxes, currentId} = this.props;
        return (<g>
            {
                boxes.map((box, index) => <Box key={box.id} box={box}
                                               selected={box.id === currentId}/>)
            }
        </g>);
    }
}
