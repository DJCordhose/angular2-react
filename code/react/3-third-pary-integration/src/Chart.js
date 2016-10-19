/* @flow */

import React from 'react';
import d3 from 'd3';
import nv from 'nvd3';

function calculateDistributionData(positions) {
    const initialReduction = {
        topLeft: 0,
        topRight: 0,
        bottomLeft: 0,
        bottomRight: 0
    };

    const mid = 250;

    const distribution = positions.reduce((reduction, position) => {
        const bottom = position.y > mid;
        const right = position.x > mid;
        if (bottom && right) {
            reduction.bottomRight++;
        }
        if (!bottom && right) {
            reduction.topRight++;
        }
        if (bottom && !right) {
            reduction.bottomLeft++;
        }
        if (!bottom && !right) {
            reduction.topLeft++;
        }
        return reduction;
    }, initialReduction);

    const data = [
        {
            "label": "Top Right",
            "value": distribution.topRight
        },
        {
            "label": "Top Left",
            "value": distribution.topLeft
        },
        {
            "label": "Bottom Right",
            "value": distribution.bottomRight
        },
        {
            "label": "Bottom Left",
            "value": distribution.bottomLeft
        }
    ];
    return data;
}
export default class Chart extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        // will be called even when shouldComponentUpdate returns false
        const {positions} = this.props;
        const data = calculateDistributionData(positions);
        // console.log(`Props have changed ${JSON.stringify(data)}`);
        d3.select(this._chart)
            .datum(data)
            .transition().duration(350)
            .call(this._nvd3chart);
    }

    componentDidMount() {
        const {positions} = this.props;
        const data = calculateDistributionData(positions);

        // http://nvd3.org/examples/pie.html
        nv.addGraph(() => {
            const chart = nv.models.pieChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .showLabels(true);

            d3.select(this._chart)
                .datum(data)
                .transition().duration(350)
                .call(chart);

            this._nvd3chart = chart;
            return chart;
        });
    }

    render() {
        return <svg className="with-3d-shadow with-transitions" ref={c => this._chart = c}></svg>
    }
}
