import {transform} from 'babel-core';
import {expect} from 'chai';
import b from 'js-beautify';

const transformOptions = {
    presets: ['es2015'],
    plugins: [
        '../index',
        ['transform-react-jsx', { pragma: 'j' } ]
    ]
};

describe('jsx-if', function() {
	it('can use an expression as a conditional', function() {
		const code = '<div display-if={yay} a="b"/>';
		const expected = '"use strict";\n\nyay ? j("div", { a: "b" }) : null;';
		const compiled = transform(code, transformOptions).code;
		expect(b(compiled)).to.equal(b(expected));
	});
    it('ignores spread attributes', function() {
        const code = '<div {...someAttrs}/>';
        const expected = '"use strict";\n\nj("div", someAttrs);';
        const compiled = transform(code, transformOptions).code;
        expect(b(compiled)).to.equal(b(expected));
    });
    it('can use a constant as a conditional', function() {
        const code = '<div display-if={true}/>';
        const expected = '"use strict";\n\ntrue ? j("div", null) : null;';
        const compiled = transform(code, transformOptions).code;
        expect(b(compiled)).to.equal(b(expected));
    });
    it('can be used on JSX elements with a closing element and children', function() {
        const code = '<div display-if={true}>yay</div>';
        const expected = `"use strict";

            true ? j(
                "div",
                null,
                "yay"
            ) : null;`;
        const compiled = transform(code, transformOptions).code;
        expect(b(compiled)).to.equal(b(expected));
    });
    it('can be used on JSXElements nested in other JSXElements', function() {
        const code = '<div><div display-if={yay}/></div>';
        const expected = `"use strict";

            j(
                "div",
                null,
                yay ? j("div", null) : null
            );`
        const compiled = transform(code, transformOptions).code;
        expect(b(compiled)).to.equal(b(expected));
    });
    it('can be used in JSXExpressionBlocks', function() {
        const code = `"use strict";

            <div>
                { a.map(() =>
                   <div display-if={yay}/>
                )}
            </div>`;
        const expected = `"use strict";

            j(
                "div",
                null,
                a.map(function() {
                    return yay ? j("div", null) : null;
                })
            );`;
        const compiled = transform(code, transformOptions).code;
        expect(b(compiled)).to.equal(b(expected));
    });
    it('can be nested', function() {
        const code = `
            <span display-if={boo}>
                <div display-if={yay}>Hello</div>
            </span>`;
        const expected = `"use strict";

            boo ? j(
                "span",
                null,
                yay ? j(
                    "div",
                    null,
                    "Hello"
                ) : null
            ) : null;`;
        const compiled = transform(code, transformOptions).code;
        expect(b(compiled)).to.equal(b(expected));
    });
});
