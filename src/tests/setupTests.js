// Enzyme is used instead of react-shallow-renderer
// for rendering tests
// Enzyme needs enzyme-adapter-react-16
// and raf (request animation frame polyfill)
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
	adapter: new Adapter()
});