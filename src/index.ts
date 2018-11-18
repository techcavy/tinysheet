const style = document.createElement('style');
document.head.appendChild(style);
const sheet: CSSStyleSheet = <CSSStyleSheet>style.sheet;

const genId = () => 's' + Math.random().toString(36).slice(2);
interface CSSObject {
  [key: string]: string | [] | CSSObject;
  _hover?: CSSObject;
  _after?: CSSObject;
  _before?: CSSObject;
}

function hyphenate(key: string): string {
  return key.replace(/[A-Z]/g, '-$&').toLowerCase()
}

class Style {
  className: string;

  constructor(className: string) {
    this.className = className;
  }

  toString() {
    return '.' + this.className;
  }
}

function makeStyle(styleObject: CSSObject, className: string = null): Style {
  let isRoot = false;
  if (className === null) {
    isRoot = true;
    className = genId();
  }

  let selector = className;
  let content = '{';
  for (let key of Object.keys(styleObject)) {
    if (key[0] === '_' && key[1] !== '_') {
      let cn = selector + hyphenate(key.replace('_', ':'));
      makeStyle(<CSSObject>styleObject[key], cn);
    } else if (key[0] === '.') {
      let cn = `${selector} ${key}`;
      makeStyle(<CSSObject>styleObject[key], cn);
    } else {
      let value = styleObject[key];
      switch (key) {
        case 'content':
          value = `"${value}"`;
          break;
      }
      content += `${hyphenate(key)}:${value};`;
    }
  }
  content += '}';

  console.log(content);
  sheet.insertRule('.' + selector + content);

  if (isRoot) {
    return new Style(className);
  }
}

export default makeStyle;