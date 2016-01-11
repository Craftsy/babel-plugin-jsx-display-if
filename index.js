export default function JsxDisplayIf({types: t}) {
    return {
        visitor: {
            JSXElement: function transform(path) {
                let { node } = path;
                let ifAttributes = node.openingElement.attributes
                    .filter(({type, name}) => type === 'JSXAttribute' && name.name === 'display-if');
                if (!ifAttributes.length) {
                    return;
                }
                let ifAttribute = ifAttributes[0];
                let newJsxOpeningElement = t.JSXOpeningElement(
                    node.openingElement.name,
                    node.openingElement.attributes
                        ? node.openingElement.attributes.filter((attr)=> attr !== ifAttribute)
                        : null
                );
                let newJsxElement = t.JSXElement(
                    newJsxOpeningElement,
                    node.closingElement,
                    node.children
                );
                let conditionalExpression = t.conditionalExpression(
                    ifAttribute.value.expression,
                    newJsxElement,
                    t.nullLiteral()
                );
                path.replaceWith(conditionalExpression);
            },
        }
    }
}
