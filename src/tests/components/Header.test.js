import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

// run before running each test
let startLogout, wrapper;

beforeEach(() => {
	// create spy functions
	startLogout = jest.fn();
	wrapper = shallow(
		<Header
			startLogout={startLogout} />
	);
});

test('render header', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
	wrapper.find('button').simulate('click');
	expect(startLogout).toHaveBeenCalled();
});

