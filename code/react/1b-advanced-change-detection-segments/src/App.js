/* @flow */

import React from 'react';
import {List} from 'immutable';

import Segment from './Segment';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        const {boxes, numberOfSegments} = this.props;
        const numberOfBoxes = boxes.length;
        const immutableBoxes = List(boxes); // eslint-disable-line new-cap
        const segmentSize = numberOfBoxes  / numberOfSegments;
        const segmentsArray = [];
        for (let i=0; i < numberOfSegments; i++) {
            const segment = immutableBoxes.slice(segmentSize * i, segmentSize * (i+1));
            segmentsArray.push(segment);
        }
        this.state = {
            segments: List(segmentsArray), // eslint-disable-line new-cap
            currentId: null
        };
    }

    render() {
        const {segments, currentId} = this.state;
		
		 const style = {
            cursor: currentId !== null ? 'pointer' : 'auto'
        };
		
        return (
            <div>
                <svg style={style} width="550" height="550"
                     onMouseDown={(event) => this.onMouseDown(event)}
                     onMouseUp={(event) => this.onMouseUp(event)}
                     onMouseMove={(event) => this.onMouseMove(event)}
                >
                    {
                        segments.map((segment, index) => {
                            const containsSelected = currentId !== null && this.find(currentId).segment === segment;
                            return <Segment key={index}
                                            boxes={segment}
                                            currentId={currentId}
                                            containsSelected={containsSelected}/>;
                        })
                    }
					{ currentId != null ? <use xlinkHref={`#${currentId}`} /> : null }
                </svg>
				<p>Current: {currentId}</p>
            </div>);
    }

    getBox(id) {
        const data = this.find(id);
        return data ? data.box : null;
    }

    find(id) {
        const {segments} = this.state;
        let data = null;
        segments.some((segment, index) => {
            const firstElementAt = index * segment.size;
            const effectiveIndex = id - firstElementAt;
            if (effectiveIndex > 0 && effectiveIndex < segment.size) {
                const box = segment.get(effectiveIndex);
                if (box) {
                    data = {
                        effectiveIndex,
                        box,
                        segment,
                        index
                    };
                    return true;
                }
            }
        });
        return data;
    }

    onMouseDown(event) {
        const id = Number(event.target.getAttribute("data-id"));
        const box = this.getBox(id);
        if (!box) {
            console.error(`No box found for id ${id}`);
            return;
        }
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
        const modifiedBox = {
            id,
            x,
            y
        };
        const {segment, index, effectiveIndex} = this.find(id);
        const modifiedSegment = segment.set(effectiveIndex, modifiedBox);
        const {segments} = this.state;
        const modifiedSegments = segments.set(index, modifiedSegment);
        this.setState({
            segments: modifiedSegments
        });
    }

}
