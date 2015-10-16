babel-plugin-jsx-if
===================

We use JSX because we want HTML gurus to maintain the JSX in our React Components.

These are hard for non-JS people to modify and understand:

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
                <ColorSwatch if={color} color={color}/>
            </div>
        );
    }
}
```

Use
---

Install with 'npm install --save-dev babel-plugin-jsx-if'. Then, add the plugin section to your .babelrc:

```
{
    "optional": [...],
    "loose": [...],
    "plugins": ["jsx-if"]
}
```

If for some reason you are using babel programatically:

```javascript
babel.transform(code, {
    plugins: ['jsx-if'],
}).code
```

