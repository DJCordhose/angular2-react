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
		
		let unselectedBoxes = [];
        let selectedBox;
        
        boxes.forEach(box => {
            if (box.id === currentId) { 
                selectedBox = <Box key={box.id} box={box} selected={true} />;
            } else {
                unselectedBoxes.push(<Box key={box.id} box={box} selected={false} /> );
            }
        });
		
        return (<g>
			{ unselectedBoxes }
            { selectedBox }
		</g>);
    }
}
