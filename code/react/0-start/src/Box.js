/* @flow */

import React from 'react';

export default class Box extends React.Component {
    render() {
        const {box, selected} = this.props;
        if (selected) {
            return <rect data-id={box.id} width="10" height="10" x={box.x} y={box.y}
                         stroke="red" fill="opaque" strokeWidth="2"/>;
        } else {
            return <rect data-id={box.id} width="10" height="10" x={box.x} y={box.y}
                         stroke="black" fill="transparent" strokeWidth="1"/>;
        }
    }
}
