/* @flow */

import React from 'react';
import d3 from 'd3';
import nv from 'nvd3';

export default class Chart extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        // http://nvd3.org/examples/pie.html
        nv.addGraph(() => {
            const chart = nv.models.pieChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .showLabels(true);

            d3.select(this._chart)
                .datum(exampleData())
                .transition().duration(350)
                .call(chart);

            return chart;
        });

        //Pie chart example data. Note how there is only a single array of key-value pairs.
        function exampleData() {
            return  [
                {
                    "label": "One",
                    "value" : 29.765957771107
                } ,
                {
                    "label": "Two",
                    "value" : 0
                } ,
                {
                    "label": "Three",
                    "value" : 32.807804682612
                } ,
                {
                    "label": "Four",
                    "value" : 196.45946739256
                } ,
                {
                    "label": "Five",
                    "value" : 0.19434030906893
                } ,
                {
                    "label": "Six",
                    "value" : 98.079782601442
                } ,
                {
                    "label": "Seven",
                    "value" : 13.925743130903
                } ,
                {
                    "label": "Eight",
                    "value" : 5.1387322875705
                }
            ];
        }
    }

    render() {
        return <div ref={c => this._chart = c}></div>
    }
}
