const babel = require('babel-core');
const plugin = require('../../');

var example = `
class Alert {
  static get VERSION() {
    return VERSION
  }
 }
`

it('works', () => {
	const {code} = babel.transform(example, {plugins: [plugin]});
	expect(code).toMatchSnapshot();
});
