'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = JsxDisplayIf;
function JsxDisplayIf(_ref) {
    var t = _ref.types;

    return {
        visitor: {
            JSXElement: function transform(path) {
                var node = path.node;

                var ifAttributes = node.openingElement.attributes.filter(function (_ref2) {
                    var type = _ref2.type;
                    var name = _ref2.name;
                    return type === 'JSXAttribute' && name.name === 'display-if';
                });
                if (!ifAttributes.length) {
                    return;
                }
                var ifAttribute = ifAttributes[0];
                var newJsxOpeningElement = t.JSXOpeningElement(node.openingElement.name, node.openingElement.attributes ? node.openingElement.attributes.filter(function (attr) {
                    return attr !== ifAttribute;
                }) : null);
                var newJsxElement = t.JSXElement(newJsxOpeningElement, node.closingElement, node.children);
                var conditionalExpression = t.conditionalExpression(ifAttribute.value.expression, newJsxElement, t.nullLiteral());
                path.replaceWith(conditionalExpression);
            }
        }
    };
}