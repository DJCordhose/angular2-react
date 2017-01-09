// https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
// http://juristr.com/blog/2016/04/angular2-change-detection/
import {
  Component, OnInit, OnChanges, AfterViewInit, DoCheck, SimpleChanges, Inject, ElementRef, ViewChild,
  Input, ChangeDetectionStrategy, IterableDiffers, IterableDiffer, ChangeDetectorRef
} from '@angular/core';
// import * as d3 from 'd3';
// import * as nv from 'nvd3';
declare var d3, nv: any;


import {calculateDistributionData} from '../../../../shared/util';

@Component({
  selector: 'nvd3-chart',
  template: `<svg width="350" height="350" class="with-3d-shadow with-transitions"></svg>`,
  // styleUrls: ['./nv.d3.css']
  // postion array will never change, so this effectively disables re-draw by angular
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Chart implements OnInit, /*OnChanges, */AfterViewInit, DoCheck {
  private _chart: HTMLElement;
  private _d3selection: any;
  private _nvd3chart: any;
  private _differ: IterableDiffer;
  private _differs: IterableDiffers;
  @Input() positions: any[];


  // @ViewChild('svg')
  // svg: SVGElement;

  constructor(@Inject(ElementRef) elementRef: ElementRef, differs: IterableDiffers, ref: ChangeDetectorRef) {
    this._chart = elementRef.nativeElement;
    this._differs = differs;
    ref.checkNoChanges();
  }

  ngOnInit() {
    // console.log(`ngOnInit: ${this._chart}`);
    this._differ = this._differs.find(this.positions).create(null);
  }

  ngDoCheck() {
    console.log(`ngDoCheck: ${this._chart}`);
    if (this._d3selection) {
      const changes = this._differ.diff(this.positions);
      if (changes) {
        // console.log('changes detected');
        // changes.forEachAddedItem(r => {
        //   console.log('added ', r.item)
        // });
        // changes.forEachRemovedItem(r => {
        //   console.log('removed ', r.item)
        // });
        this.updateChanges(this.positions);
      } else {
        // console.log('nothing changed');
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`ngOnChanges: ${this._chart}`);
    // const change = changes["positions"];
    //
    // if (!change.isFirstChange()) {
    //   this.updateChanges(change.currentValue);
    // }
  }

  updateChanges(positions) {
    if (this._d3selection) {
      const data = calculateDistributionData(positions);
      this._d3selection
        .datum(data)
        .transition().duration(350)
        .call(this._nvd3chart);
    }
  }

  ngAfterViewInit() {
    // console.log(`ngAfterViewInit: ${this._chart}`);

    // const positions = [];
    const data = calculateDistributionData(this.positions);
    // const data = [
    //   {
    //     "label": "Top Right",
    //     "value": 100
    //   },
    //   {
    //     "label": "Top Left",
    //     "value": 200
    //   },
    //   {
    //     "label": "Bottom Right",
    //     "value": 300
    //   },
    //   {
    //     "label": "Bottom Left",
    //     "value": 400
    //   }
    // ];

    const svgEl = this._chart.children[0];

    // http://nvd3.org/examples/pie.html
    nv.addGraph(() => {
      const chart = nv.models.pieChart()
        .x(function (d) {
          return d.label
        })
        .y(function (d) {
          return d.value
        })
        .showLabels(true);

      this._d3selection = d3.select(svgEl);
      this._d3selection
        .datum(data)
        .transition().duration(350)
        .call(chart);

      this._nvd3chart = chart;
      return chart;
    });

  }

}
