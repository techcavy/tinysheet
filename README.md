# tinysheet
A zero dependency framework-agnostic microtoolkit for generating modular css with javascript

## installation (note, not really all that stable at the moment)

```
npm install tinysheet
```

## How to use it

### basic use
```javascript

import makeStyle from 'tinysheet';

// uses camel case css properties, and selectors such as :hover, :active can be targeted with an underscore
const buttonStyle = makeStyle({
  padding: '1.5em',
  backgroundColor: 'red',
  borderRadius: '5px',
  _hover: {
    backgroundColor: 'hotpink',
  },
});

// react style
const Button = (props) => (
  <button type="button" className={buttonStyle.className}>{props.label}</button>
);

// vanilla JS style
let buttonElement = document.createElement('button');
buttonElement.classList.add(buttonStyle.className);
document.body.appendChild(buttonElement);

```

### More complex selectors (follows on from the above example)
```javascript

// you can target selectors for existing style by using the 'selector' property of the returned class
const buttonGroupStyle = makeStyle({
  display: 'flex',
  [buttonStyle.selector]: {
    borderRadius: 0,
    _firstChild: {
      borderTopLeftRadius: '5px',
      borderBottomLeftRadius: '5px',
    },
    _lastChild: {
      borderTopRightRadius: '5px',
      borderBottomRightRadius: '5px',
    },
  },
});

// react style
const ButtonGroup = (props) => (
  <div className={buttonGroupStyle.className}>
    {props.children}
  </div>
);

```