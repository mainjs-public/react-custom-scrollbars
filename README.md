# @mainjs/react-custom-scrollbars

[![npm version](https://img.shields.io/npm/v/@mainjs/react-custom-scrollbars.svg?style=flat-square)](https://www.npmjs.com/package/@mainjs/react-custom-scrollbars)

## Example

```js
// In your React component:
render() {
  return (
    <Scroll
    />
  );
}
```

## Sound as a component?

Yes! It's really easy to custom scroll in your app as part of the component tree in your React app.

* **Want to custom scroll.

## How to install

`npm install @mainjs/react-custom-scrollbars --save`

## How to use

```js
var React = require('react');
var { Scroll } = require('@mainjs/react-custom-scrollbars').default;

// ... or using import:
import React from 'react';
import Sound from '@mainjs/react-custom-scrollbars';

class MyComponentWithSound extends React.Component {
  render() {
    return <Scroll {...props} />; // Check props in next section
  }
}
```

### Props

* *height (number)*: The height of the scroll container.

## How to contribute

Feel free to fork and send PRs or issues, be it for features, bug fixes, or documentation!
