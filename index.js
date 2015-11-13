export default function jsxIfTransform({Plugin, types: t }) {
    return new Plugin('jsx-display-if', {
        visitor: {
            JSXElement: function transform(node, parent) {
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
                    t.literal(null)
                );
                return conditionalExpression;
            },
        }
    });
}
