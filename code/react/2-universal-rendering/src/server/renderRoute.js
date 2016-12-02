import React from 'react';
import {renderToString} from 'react-dom/server';

import App from '../common/App';
import {createBoxes} from '../common/util';

function renderFullPage(html, initialData) {
    return `
<html>
  <body>
    <div id="mount">${html}</div>
  </body>

  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(initialData)};
  </script>
  <script src="dist/main.js"></script>
</html>`;
}

export default function (numberOfBoxes) {
    const numberOfSegments = 10;
    const boxes = createBoxes(numberOfBoxes);
    const data = {
        boxes,
        numberOfSegments
    };

    const html =
        renderToString(
            <App boxes={boxes} numberOfSegments={100}/>
        );
    return renderFullPage(html, data);
};

