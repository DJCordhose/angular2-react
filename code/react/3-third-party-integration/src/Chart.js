/* @flow */

import React from 'react';
import d3 from 'd3';
import nv from 'nvd3';
// import {calculateDistributionData} from '../../../shared/util';
import {calculateDistributionData} from './util';

export default class Chart extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        const {dragInProgress} = nextProps;
        if (dragInProgress) {
            return;
        }
        console.log('Updating diagramm');
        // will be called even when shouldComponentUpdate returns false
        const {positions} = nextProps;
        const data = calculateDistributionData(positions);
        // console.log(`Props have changed ${JSON.stringify(data)}`);
        this._d3selection
            .datum(data)
            .transition().duration(350)
            .call(this._nvd3chart);
        // TODO: chart looses its use state when updating data
        // this._nvd3chart.dispatch.stateChange(data);
        // this._nvd3chart
        //     .datum(data)
        //     .dispatch.changeState
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

            this._d3selection = d3.select(this._chart);
            this._d3selection
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
