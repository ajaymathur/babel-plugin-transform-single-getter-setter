const babel = require('babel-core');
const plugin = require('./');

var example = `
class Alert {
  static get VERSION() {
    return VERSION
  }
 }
`

it('matches snapshot', () => {
	const {code} = babel.transform(example, {plugins: [plugin]});
	expect(code).toMatchSnapshot();
});
