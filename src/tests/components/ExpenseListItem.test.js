import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('ExpenseListItem - render 1 list', () => {
	const expense = expenses[2];
	const wrapper = shallow(<ExpenseListItem {...expense} />);
	expect(wrapper).toMatchSnapshot();
});