# angular2-react
A very friendly story of how Angular 2 and React solve different use cases and can inspire each other

## React

Sample app displays a number of boxes. Move them around by D'n'D. Initial very should feel quite laggy.

### Change Detection

* no optimization: https://djcordhose.github.io/angular2-react/code/react/0-start/public
* shouldComponentUpdate: https://djcordhose.github.io/angular2-react/code/react/1-advanced-change-detection/public
* segmented model: https://djcordhose.github.io/angular2-react/code/react/1b-advanced-change-detection-segments/public

### Universal Rendering

Based on segmented model. Needs server, so can not be served directly from Github.

* `cd code/react/2-universal-rendering`
* `npm start`
* `open localhost:3000`

### 3rd Party integration

http://nvd3.org/ displays a pie char of the distribution of the boxes demoing how to integrate 3rd party libraries. 
Updates when boxes are moved around by using lifecyle method `componentWillReceiveProps`. 

https://djcordhose.github.io/angular2-react/code/react/3-third-party-integration/public


