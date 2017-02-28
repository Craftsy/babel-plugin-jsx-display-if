# babel-plugin-jsx-display-if
[![npm version](https://img.shields.io/npm/v/babel-plugin-jsx-display-if.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-jsx-display-if) [![npm downloads](https://img.shields.io/npm/dm/babel-plugin-jsx-display-if.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-jsx-display-if)


[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7fa73e3de5ae4f2baecea481870c4055)](https://www.codacy.com/app/donabrams/babel-plugin-jsx-display-if?utm_source=github.com&utm_medium=referral&utm_content=Craftsy/babel-plugin-jsx-display-if&utm_campaign=badger)

We use JSX because we want HTML gurus to maintain the JSX in our React Components.

These examples are hard for non-JS people to modify and understand:

```javascript
class Example extends React.Component {
    render() {
        let {
            color
        } = this.props;
        let $node = color ? <ColorSwatch color={color}/> : null;
        return (
            <div>
                {$node}
            </div>
        );
    }
}

class Example2 extends React.Component {
    renderColor() {
        if (this.props.color) {
            return <ColorSwatch color={this.props.color}/>;
        }
    }
    render() {
        return (
            <div>
                {this._renderColor()}
            </div>
        );
    }
}
```

They are even harder in nested scenarios. This is much easier for our non-JS gurus (and shorter with more clarity around purpose):

```javascript
class Example extends React.Component {
    render() {
        let {
            color
        } = this.props;
        return (
            <div>
                <ColorSwatch display-if={color} color={color}/>
            </div>
        );
    }
}
```

## Installation
```sh
npm install --save-dev babel-plugin-jsx-display-if
```

## Use
### Via `.babelrc` (Recommended)

**.babelrc**
```
{
    "optional": [...],
    "loose": [...],
    "plugins": ["jsx-display-if"]
}
```

If for some reason you are using babel programatically:

```javascript
babel.transform(code, {
    plugins: ['jsx-display-if'],
}).code
```

