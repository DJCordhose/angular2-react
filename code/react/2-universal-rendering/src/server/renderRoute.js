import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../common/App';
import { createBoxes } from '../common/util';

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

export default function(request, reply) {
    const numberOfSegments = 10;
    const boxes = createBoxes(2000);
    const data = {
        boxes,
        numberOfSegments
    };

    const html =
    renderToString(
        <App boxes={boxes} numberOfSegments={100}/>
    );
  reply(renderFullPage(html, data));
};

